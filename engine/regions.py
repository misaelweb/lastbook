"""Regions with a detailed offline map that this build offers in setup.

The US state maps are published at downloads.lastbook.org and setup downloads the one a person picks.
A region outside the US is built on a computer with tools/build_region_map.py and shipped as one zip;
setup lists it here, finds that zip on the computer and installs it without any download. The map
itself is the same data layout a state map uses, so the engine needs nothing else.

Adding a region: build it, upload the zip somewhere the person can download it, and add the file's
name, size and SHA-256 below. Keep the box and the Geofabrik extract in step with packaging/regions.py.
"""
import os
from pathlib import Path

REGIONS = {
    'BR-SP': {
        'name_en': 'Brazil — São Paulo',
        'name_pt': 'Brasil — São Paulo',
        'file': 'Lastbook-Map-BR-SP.zip',
        'size': 477154419,
        'sha256': '7e83828fa27249d0ba842bad6896ad7728eee18aa3b575ba57d6a0a1a66456c5',
        'installed_bytes': 1297444926,
        'includes_en': 'Local streets, water, land, towns and help points',
        'includes_pt': 'Ruas, água, uso do solo, cidades e pontos de ajuda',
        # for tools/build_region_map.py: west, south, east, north and the Geofabrik extract
        'box': (-53.15, -25.35, -44.15, -19.75),
        'gpkg_region': 'south-america/brazil/sudeste-latest-free.gpkg.zip',
        'place_detail': 'São Paulo, Brasil (OpenStreetMap)',
    },
}


def get(code):
    try:
        return REGIONS[code]
    except KeyError:
        raise SystemExit(f'unknown region {code!r}; known: {", ".join(sorted(REGIONS))}')


def listing(lang='en'):
    pt = str(lang).lower().startswith('pt')
    return [{'id': code, 'title': r['name_pt'] if pt else r['name_en'], 'country': code.split('-')[0]}
            for code, r in sorted(REGIONS.items())]


def manifest_entries(lang='en'):
    """The maps setup shows, in the manifest's own shape. `local` says there is no URL to fetch: the
    zip has to be on the computer."""
    pt = str(lang).lower().startswith('pt')
    out = []
    for code, r in sorted(REGIONS.items()):
        out.append({
            'id': code,
            'title': r['name_pt'] if pt else r['name_en'],
            'kind': 'state',
            'includes': r['includes_pt'] if pt else r['includes_en'],
            'installed_bytes': r['installed_bytes'],
            'download_bytes': r['size'],
            'available': True,
            'local': True,
            'files': [{'name': r['file'], 'size': r['size'], 'sha256': r['sha256'], 'kind': 'zip', 'url': None}],
        })
    return out


def search_dirs(extra=()):
    """Where a person's downloaded map zip is likely to be."""
    dirs = []
    env = os.environ.get('LASTBOOK_MAPS')
    if env:
        dirs.extend(Path(p) for p in env.split(os.pathsep) if p)
    home = Path.home()
    dirs.extend([home / 'Downloads', home / 'Desktop', home / 'Documents', Path.cwd()])
    dirs.extend(Path(p) for p in extra if p)
    seen, out = set(), []
    for d in dirs:
        try:
            key = str(d.resolve())
        except OSError:
            continue
        if key not in seen and d.is_dir():
            seen.add(key)
            out.append(d)
    return out


def find_file(name, size, extra=()):
    """The map zip on this computer: its published name and size, and its SHA-256 is checked on use."""
    for d in search_dirs(extra):
        p = d / name
        try:
            if p.is_file() and p.stat().st_size == size:
                return p
        except OSError:
            continue
    return None


def file_for(entry, extra=()):
    """The zip a manifest map entry needs, or None."""
    for f in entry.get('files') or []:
        found = find_file(f['name'], f['size'], extra)
        if found:
            return found
    return None
