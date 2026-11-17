#!/usr/bin/env python3
"""Install a map set built by tools/build_region_map.py (or a released state map) into a data folder.

  python3 tools/install_map_set.py --data "C:/Users/you/LastbookData" --set derived/packs/maps/BR-SP
  python3 tools/install_map_set.py --data ... --set ... --dry-run

What it does, in order:

  1. reads the new set's map-set.json and checks every file it lists is there at its size;
  2. moves the files of the map set already installed (its own map-set.json) to
     ``<data>/derived/geo/map-set-previous-<time>/`` so nothing is lost;
  3. copies the new files into the data folder.

The library (library-data/), the catalog and the address indexes are not touched. Close Lastbook
first: on Windows an open file cannot be replaced.
"""
import argparse
import json
import pathlib
import shutil
import sqlite3
import sys
import tempfile
import time
import zipfile


def unpack_zip(path):
    """A downloaded map set is a zip; unpack it to a temporary folder, refusing paths that escape it."""
    out = tempfile.mkdtemp(prefix='lastbook-map-')
    with zipfile.ZipFile(path) as z:
        for info in z.infolist():
            name = pathlib.PurePosixPath(info.filename)
            if name.is_absolute() or '..' in name.parts:
                raise SystemExit(f'the zip holds an unsafe path: {info.filename}')
            if info.is_dir():
                continue
            dest = pathlib.Path(out, *name.parts)
            dest.parent.mkdir(parents=True, exist_ok=True)
            with z.open(info) as src, open(dest, 'wb') as dst:
                shutil.copyfileobj(src, dst, 1 << 20)
    return pathlib.Path(out)


def files_in(lib):
    """Every path map-set.json lists, checked to stay inside the data folder."""
    manifest = pathlib.Path(lib) / 'map-set.json'
    if not manifest.is_file():
        return {}
    try:
        data = json.loads(manifest.read_text(encoding='utf-8'))
    except (OSError, ValueError):
        raise SystemExit(f'{manifest} is not readable JSON')
    out = {}
    for rel, size in (data.get('files') or {}).items():
        p = (pathlib.Path(lib) / rel)
        if '..' in pathlib.PurePosixPath(rel).parts:
            raise SystemExit(f'map-set.json escapes the data folder: {rel}')
        out[p] = size
    return out


MAP_FIXED = ('map-set.json', 'derived/geo/national-status.json', 'derived/geo/socal-cells.json',
             'library-data/geography/resources/atlas.sqlite')


def installed_map_files(lib):
    """Every file that belongs to the map set already in the data folder.

    The old set's own map-set.json is the first answer; a downloaded pack can arrive without one, so
    the files the app reads as the map (the SQLite files under derived/geo, the status files and the
    atlas) count too. Moving them all aside is what stops US terrain, water or a previous state's
    streets from lingering under a new region."""
    out = set(files_in(lib))
    lib = pathlib.Path(lib)
    for rel in MAP_FIXED:
        p = lib / rel
        if p.is_file():
            out.add(p)
    geo = lib / 'derived/geo'
    if geo.is_dir():
        for p in geo.iterdir():
            if p.is_file() and (p.suffix == '.sqlite' or p.name.endswith(('.sqlite-wal', '.sqlite-shm'))):
                out.add(p)
    return out


def update_pack_manifest(lib, set_dir):
    """Keep pack-manifest.tsv in step with the map that is now installed.

    The repair ("Check the library") compares every file with this manifest. Without this, it would
    call the new map damaged and download the pack's own map again, undoing the install. Only the map
    rows change; every other file keeps its row."""
    tsv = pathlib.Path(lib) / 'pack-manifest.tsv'
    if not tsv.is_file():
        return
    import hashlib
    map_prefixes = ('derived/geo/', 'library-data/geography/resources/atlas.sqlite')
    keep = []
    for line in tsv.read_text(encoding='utf-8').splitlines():
        if not line.strip():
            continue
        rel = line.split('\t')[0]
        if rel == 'path' or not (rel == 'map-set.json' or rel.startswith(map_prefixes)):
            keep.append(line)
    if not keep or not keep[0].startswith('path'):
        keep.insert(0, 'path\tbytes\tsha256\thow\tchanges')
    for p in sorted(pathlib.Path(set_dir).rglob('*')):
        if not p.is_file():
            continue
        rel = p.relative_to(set_dir).as_posix()
        h = hashlib.sha256()
        with open(p, 'rb') as f:
            while True:
                b = f.read(1 << 23)
                if not b:
                    break
                h.update(b)
        keep.append(f'{rel}\t{p.stat().st_size}\t{h.hexdigest()}\tclone\t')
    tsv.write_text('\n'.join(keep) + '\n', encoding='utf-8')


def check(set_dir):
    set_dir = pathlib.Path(set_dir)
    manifest = set_dir / 'map-set.json'
    if not manifest.is_file():
        raise SystemExit(f'no map-set.json in {set_dir}: is this a map set folder?')
    data = json.loads(manifest.read_text(encoding='utf-8'))
    if not data.get('name'):
        raise SystemExit(f'{manifest} does not name the map')
    missing, wrong = [], []
    for rel, size in (data.get('files') or {}).items():
        p = set_dir / rel
        if not p.is_file():
            missing.append(rel)
        elif p.stat().st_size != size:
            wrong.append(rel)
    if missing or wrong:
        raise SystemExit(f'map set is incomplete (missing: {missing[:3]}, wrong size: {wrong[:3]})')
    national = set_dir / 'derived/geo/national.sqlite'
    if national.is_file():
        db = sqlite3.connect(f'file:{national}?immutable=1', uri=True)
        try:
            n = db.execute('SELECT count(*) FROM feat').fetchone()[0]
            pins = db.execute('SELECT count(*) FROM poi').fetchone()[0]
        except sqlite3.Error as e:
            raise SystemExit(f'national.sqlite is not the expected map database: {e}')
        finally:
            db.close()
        print(f'map {data["name"]}: {n:,} features, {pins:,} pins, {data.get("bytes", 0) / 1048576:.1f} MB')
    return data


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--data', required=True, help='the LastbookData folder')
    ap.add_argument('--set', required=True, help='the map set folder to install')
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()

    lib = pathlib.Path(args.data).expanduser().resolve()
    if not (lib / 'library-data').is_dir() and not (lib / 'derived').is_dir():
        raise SystemExit(f'{lib} does not look like a Lastbook data folder (no library-data/ or derived/)')
    set_dir = pathlib.Path(args.set).expanduser().resolve()
    temporary = None
    if set_dir.is_file() and set_dir.suffix.lower() == '.zip':
        print(f'unpacking {set_dir.name}…', flush=True)
        set_dir = unpack_zip(set_dir)
        temporary = set_dir
    check(set_dir)
    old = installed_map_files(lib)

    stamp = time.strftime('%Y%m%d-%H%M%S')
    aside = lib / 'derived/geo' / f'map-set-previous-{stamp}'
    if args.dry_run:
        print(f'would move {len(old)} old map files to {aside}')
        print(f'would copy {sum(1 for _ in set_dir.rglob("*") if _.is_file())} files from {set_dir}')
        if temporary:
            shutil.rmtree(temporary, ignore_errors=True)
        return 0

    moved = 0
    for p in old:
        if p.exists():
            aside.mkdir(parents=True, exist_ok=True)
            dest = aside / p.relative_to(lib)
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(p), str(dest))
            moved += 1
    if moved:
        print(f'moved {moved} files of the previous map set to {aside}')

    copied = 0
    for src in sorted(set_dir.rglob('*')):
        if not src.is_file():
            continue
        dest = lib / src.relative_to(set_dir)
        dest.parent.mkdir(parents=True, exist_ok=True)
        if dest.exists():
            dest.unlink()
        shutil.copy2(src, dest)
        copied += 1
    print(f'installed {copied} files into {lib}')
    try:
        update_pack_manifest(lib, set_dir)
    except OSError as e:
        print(f'note: could not update pack-manifest.tsv ({e}); "Check the library" would re-download the pack map')
    if temporary:
        shutil.rmtree(temporary, ignore_errors=True)
    print('Open Lastbook and check the map; Map -> "All" fits the new area.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
