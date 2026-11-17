#!/usr/bin/env python3
"""Build a detailed offline map set for a region outside the United States.

The US state maps are cut from datasets that only exist for the US (USGS, Census, USDA, Microsoft
buildings). Everywhere else the public source is OpenStreetMap, published by Geofabrik as one
GeoPackage per region. This tool turns that GeoPackage into the same files the app already reads, so
a map set for, say, São Paulo works with no change to the engine:

  python3 tools/build_region_map.py --region BR-SP --gpkg /path/sudeste-latest-free.gpkg --out derived/packs/maps/BR-SP

Output (the files docs/MAPS.md lists, minus the layers this source cannot give):

  derived/geo/national.sqlite   feat, feat_idx, poi, meta   roads, water, land, rails, places, help points
  derived/geo/places.sqlite     place, place_fts            the place finder
  derived/geo/map.sqlite        empty schema                the app always opens it
  derived/geo/national-status.json, derived/geo/socal-cells.json, map-set.json

Buildings, terrain, crops and the US resource atlas are left out: the app hides what a map set does
not hold (web/map.js reads /api/map/info). Copy the folder into a data folder with
tools/install_map_set.py.

Source: OpenStreetMap contributors, via Geofabrik's ``<region>-latest-free.gpkg.zip`` (ODbL 1.0).
The geometry packing below matches tools/build_map.py, so both produce interchangeable files.
"""
import argparse
import json
import math
import pathlib
import re
import sqlite3
import struct
import sys
import time
import zipfile
from array import array

ROOT = pathlib.Path(__file__).resolve().parents[1]
Q = 1e6

sys.path.insert(0, str(ROOT / 'packaging'))

ROAD_Z = {'motorway': 5, 'trunk': 6, 'motorway_link': 10, 'trunk_link': 10, 'primary': 8, 'primary_link': 12,
          'secondary': 10, 'secondary_link': 13, 'tertiary': 11, 'tertiary_link': 13, 'residential': 13,
          'unclassified': 13, 'living_street': 14, 'pedestrian': 14, 'busway': 14, 'service': 15,
          'track': 13, 'track_grade1': 13, 'track_grade2': 13, 'track_grade3': 13, 'track_grade4': 13, 'track_grade5': 13,
          'footway': 15, 'path': 14, 'cycleway': 14, 'steps': 16, 'bridleway': 14, 'unknown': 15}
LANDUSE_KEEP = {'park': 'park', 'forest': 'green', 'grass': 'green', 'meadow': 'green', 'scrub': 'green', 'heath': 'green',
                'recreation_ground': 'park', 'cemetery': 'park', 'allotments': 'farm', 'farmland': 'farm',
                'orchard': 'farm', 'vineyard': 'farm', 'farmyard': 'farm', 'residential': 'res', 'commercial': 'com',
                'retail': 'com', 'industrial': 'ind', 'military': 'ind', 'quarry': 'ind', 'landfill': 'ind'}
PLACE_Z = {'county': 7, 'city': 6, 'town': 9, 'suburb': 12, 'village': 11, 'hamlet': 14, 'locality': 14, 'island': 11,
           'farm': 15, 'region': 5}
POI_KEEP = {'hospital', 'clinic', 'doctors', 'pharmacy', 'chemist', 'dentist', 'veterinary', 'fire_station', 'police',
            'drinking_water', 'water_tower', 'water_works', 'fountain', 'toilet', 'shelter', 'community_centre',
            'town_hall', 'school', 'library', 'supermarket', 'convenience', 'doityourself', 'hardware', 'garden_centre',
            'post_office', 'camp_site', 'wastewater_plant', 'comms_tower', 'spring', 'park', 'courthouse', 'embassy',
            'nursing_home', 'kindergarten', 'college', 'university', 'bicycle_shop', 'car_repair', 'fuel', 'beach'}


# --------------------------------------------------------------- geometry ----
def wkb_parts(b, o):
    """Return (list of parts as flat [x,y,...] lists, offset). Polygons yield their rings as parts."""
    le = b[o] == 1
    e = '<' if le else '>'
    t = struct.unpack_from(e + 'I', b, o + 1)[0] % 1000
    o += 5
    if t == 1:
        x, y = struct.unpack_from(e + 'dd', b, o)
        return [[x, y]], o + 16
    if t == 2:
        n = struct.unpack_from(e + 'I', b, o)[0]
        return [list(struct.unpack_from(e + '%dd' % (2 * n), b, o + 4))], o + 4 + 16 * n
    if t == 3:
        nr = struct.unpack_from(e + 'I', b, o)[0]
        o += 4
        parts = []
        for _ in range(nr):
            n = struct.unpack_from(e + 'I', b, o)[0]
            parts.append(list(struct.unpack_from(e + '%dd' % (2 * n), b, o + 4)))
            o += 4 + 16 * n
        return parts, o
    if t in (4, 5, 6, 7):
        n = struct.unpack_from(e + 'I', b, o)[0]
        o += 4
        parts = []
        for _ in range(n):
            p, o = wkb_parts(b, o)
            parts.extend(p)
        return parts, o
    raise ValueError('geometry type %d' % t)


def gpkg_parts(g):
    flags = g[3]
    env = (flags >> 1) & 7
    off = 8 + {0: 0, 1: 32, 2: 48, 3: 48, 4: 64}[env]
    return wkb_parts(g, off)[0]


def simplify(flat, tol):
    """Drop points closer than tol (degrees) to the previous kept point; keeps endpoints."""
    if len(flat) <= 4 or tol <= 0:
        return flat
    out = [flat[0], flat[1]]
    px, py = flat[0], flat[1]
    for i in range(2, len(flat) - 2, 2):
        x, y = flat[i], flat[i + 1]
        if abs(x - px) > tol or abs(y - py) > tol:
            out += [x, y]
            px, py = x, y
    out += [flat[-2], flat[-1]]
    return out


def pack(parts):
    """int32 array: nparts, then for each part npts followed by quantized x,y deltas."""
    a = array('i', [len(parts)])
    for p in parts:
        n = len(p) // 2
        a.append(n)
        lx = ly = 0
        for i in range(n):
            x, y = int(round(p[2 * i] * Q)), int(round(p[2 * i + 1] * Q))
            a.append(x - lx); a.append(y - ly)
            lx, ly = x, y
    return a.tobytes()


def bbox(parts):
    xs = [v for p in parts for v in p[0::2]]
    ys = [v for p in parts for v in p[1::2]]
    return min(xs), max(xs), min(ys), max(ys)


def area_z(minx, maxx, miny, maxy, base):
    size = max(maxx - minx, maxy - miny)
    if size <= 0:
        return 17
    z = int(math.log2(360 / size)) - 4
    return max(base, min(16, z))


# ---------------------------------------------------------------- database ----
def empty_schema(db):
    """The tables server.py expects in every map file it opens."""
    db.executescript('''
      CREATE TABLE IF NOT EXISTS feat(id INTEGER PRIMARY KEY, layer TEXT, cls TEXT, name TEXT, minz INTEGER, geom BLOB);
      CREATE VIRTUAL TABLE IF NOT EXISTS feat_idx USING rtree(id, minx, maxx, miny, maxy, minz, maxz);
      CREATE TABLE IF NOT EXISTS poi(id INTEGER PRIMARY KEY, cls TEXT, name TEXT, lon REAL, lat REAL);
      CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT);
      CREATE INDEX IF NOT EXISTS poi_cls ON poi(cls, lon, lat);
    ''')


def places_db(path, rows):
    if path.exists():
        path.unlink()
    db = sqlite3.connect(path)
    db.executescript('''CREATE TABLE place(id INTEGER PRIMARY KEY, name TEXT, kind TEXT, detail TEXT, lat REAL, lon REAL, rank INTEGER, source TEXT);
      CREATE VIRTUAL TABLE place_fts USING fts5(name, detail, content='place', content_rowid='id', tokenize='unicode61');''')
    db.executemany('INSERT INTO place(name,kind,detail,lat,lon,rank,source) VALUES (?,?,?,?,?,?,?)', rows)
    db.execute("INSERT INTO place_fts(place_fts) VALUES ('rebuild')")
    db.commit()
    db.close()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--region', required=True, help='a code from packaging/regions.py, such as BR-SP')
    ap.add_argument('--gpkg', required=True, help='a Geofabrik .gpkg file or its .zip')
    ap.add_argument('--out', required=True, help='folder for the map set, such as derived/packs/maps/BR-SP')
    ap.add_argument('--box', help='override the region box: west,south,east,north')
    ap.add_argument('--skip-buildings', action='store_true',
                    help='leave out OSM building footprints: a much smaller and faster map set')
    args = ap.parse_args()

    import regions

    region = regions.get(args.region)
    if args.box:
        box = tuple(float(v) for v in args.box.split(','))
    else:
        box = region['box']
    w, s, e, n = box

    gpkg = pathlib.Path(args.gpkg)
    tmp = None
    if gpkg.suffix.lower() == '.zip':
        with zipfile.ZipFile(gpkg) as z:
            member = next(nm for nm in z.namelist() if nm.endswith('.gpkg'))
            tmp = pathlib.Path(args.out).parent / ('_extract-' + pathlib.Path(member).name)
            if not tmp.exists():
                print('unpacking', member, flush=True)
                with z.open(member) as src, open(tmp, 'wb') as dst:
                    while True:
                        chunk = src.read(1 << 22)
                        if not chunk:
                            break
                        dst.write(chunk)
        gpkg = tmp

    out = pathlib.Path(args.out)
    geo = out / 'derived/geo'
    if out.exists():
        for p in sorted(out.rglob('*'), reverse=True):
            p.unlink() if p.is_file() else p.rmdir()
    geo.mkdir(parents=True, exist_ok=True)
    (out / 'library-data/geography/resources').mkdir(parents=True, exist_ok=True)

    t0 = time.time()
    src = sqlite3.connect(f'file:{gpkg}?immutable=1', uri=True)
    dst = sqlite3.connect(geo / 'national.sqlite')
    dst.executescript('PRAGMA journal_mode=OFF; PRAGMA synchronous=OFF;')
    empty_schema(dst)
    fid = [0]
    kept = [0]

    tables = {r[0] for r in src.execute("SELECT name FROM sqlite_master WHERE type='table'")}

    def inside(parts):
        """A rough test: does any point of this feature fall in the region box?"""
        for p in parts:
            for i in range(0, len(p), 2):
                if w <= p[i] <= e and s <= p[i + 1] <= n:
                    return True
        return False

    def each(table, cols='fclass,name'):
        if table not in tables:
            return
        rtree = f'rtree_{table}_geom'
        sql = f'SELECT geom,{cols} FROM {table}'
        params = ()
        if rtree in tables:   # Geofabrik ships a spatial index: let SQLite do the box test
            sql = (f'SELECT t.geom,{",".join("t." + c.strip() for c in cols.split(","))} FROM {table} t JOIN {rtree} r ON r.id=t.fid '
                   'WHERE r.maxx>=? AND r.minx<=? AND r.maxy>=? AND r.miny<=?')
            params = (w, s, e, n)
        for row in src.execute(sql, params):
            if row[0] is None:
                continue
            try:
                parts = gpkg_parts(row[0])
            except Exception:
                continue
            if not inside(parts):
                continue
            kept[0] += 1
            yield parts, row[1:]

    def add(layer, cls, name, minz, parts):
        if not parts:
            return
        fid[0] += 1
        bx = bbox(parts)
        dst.execute('INSERT INTO feat VALUES (?,?,?,?,?,?)', (fid[0], layer, cls, name, minz, pack(parts)))
        dst.execute('INSERT INTO feat_idx VALUES (?,?,?,?,?,?,?)', (fid[0], *bx, minz, 30))

    for parts, (cls, name) in each('gis_osm_water_a_free'):
        layer = 'wet' if str(cls).startswith('wetland') else 'water'
        add(layer, cls, name, area_z(*bbox(parts), 7), [simplify(p, 0.00001) for p in parts])
    print('water', fid[0], round(time.time() - t0), flush=True)
    for parts, (cls, name) in each('gis_osm_natural_a_free'):
        if cls == 'beach':
            add('beach', cls, name, area_z(*bbox(parts), 10), parts)
    for parts, (cls, name) in each('gis_osm_landuse_a_free'):
        k = LANDUSE_KEEP.get(cls)
        if k:
            add('land', k, name, area_z(*bbox(parts), 9), [simplify(p, 0.00001) for p in parts])
    for parts, (cls,) in each('gis_osm_protected_areas_a_free', 'fclass'):
        add('land', 'park', None, area_z(*bbox(parts), 8), [simplify(p, 0.00002) for p in parts])
    print('land', fid[0], round(time.time() - t0), flush=True)
    for parts, (cls, name) in each('gis_osm_waterways_free'):
        add('waterway', cls, name, 10 if cls == 'river' else 13, parts)
    for parts, (cls, name) in each('gis_osm_railways_free'):
        add('rail', cls, name, 10 if cls == 'rail' else 13, parts)
    print('lines', fid[0], round(time.time() - t0), flush=True)
    for parts, (cls, name, ref) in each('gis_osm_roads_free', 'fclass,name,ref'):
        add('road', cls, name or ref, ROAD_Z.get(cls, 15), parts)
    print('roads', fid[0], round(time.time() - t0), flush=True)
    dst.commit()
    if not args.skip_buildings:
        for parts, (cls, name) in each('gis_osm_buildings_a_free'):
            add('bldg', cls or '', None, 15, [simplify(parts[0], 0.000002)])
        print('buildings', fid[0], round(time.time() - t0), flush=True)
    dst.commit()

    places = []
    for parts, (cls, pop, name) in each('gis_osm_places_free', 'fclass,population,name'):
        if not name:
            continue
        z = PLACE_Z.get(cls, 14)
        if cls in ('city', 'town') and pop:
            try:
                if int(pop) > 300000:
                    z = 5
            except ValueError:
                pass
        add('place', cls, name, z, parts)
        minx, maxx, miny, maxy = bbox(parts)
        lon, lat = (minx + maxx) / 2, (miny + maxy) / 2
        places.append((name, str(cls).replace('_', ' '), region['place_detail'], lat, lon, 1 if cls in ('city', 'town') else 3, 'OpenStreetMap'))

    pid = 0
    org = region['box']
    for table in ('gis_osm_pois_free', 'gis_osm_pois_a_free', 'gis_osm_natural_free', 'gis_osm_natural_a_free'):
        for parts, (cls, name) in each(table):
            if cls not in POI_KEEP:
                continue
            if table == 'gis_osm_natural_free' and cls != 'spring':
                continue
            minx, maxx, miny, maxy = bbox(parts)
            pid += 1
            lon, lat = (minx + maxx) / 2, (miny + maxy) / 2
            dst.execute('INSERT INTO poi VALUES (?,?,?,?,?)', (pid, cls, name, lon, lat))
            if name:
                places.append((name, str(cls).replace('_', ' '), region['place_detail'], lat, lon, 4, 'OpenStreetMap'))
    dst.executemany('INSERT INTO meta VALUES (?,?)', [
        ('source', 'OpenStreetMap contributors, via Geofabrik %s (ODbL 1.0)' % region['gpkg_region']),
        ('data_as_of', region.get('data_as_of', '')),
        ('bounds', '%.4f,%.4f,%.4f,%.4f' % (w, s, e, n)),
        ('built', time.strftime('%Y-%m-%dT%H:%M:%S')),
        ('region', args.region),
        ('region_name', region['name_en']),
    ])
    dst.commit()
    features = fid[0]
    dst.close()
    src.close()
    print('done features', features, 'pois', pid, round(time.time() - t0), 's', flush=True)

    places_db(geo / 'places.sqlite', places)

    db = sqlite3.connect(geo / 'map.sqlite')
    empty_schema(db)
    db.commit()
    db.close()

    status = {'state': 'complete', 'stage': 'ready', 'features': features}
    (geo / 'national-status.json').write_text(json.dumps(status), encoding='utf-8')
    (geo / 'socal-cells.json').write_text('[]', encoding='utf-8')

    files = {f.relative_to(out).as_posix(): f.stat().st_size for f in out.rglob('*') if f.is_file()}
    (out / 'map-set.json').write_text(json.dumps({'name': args.region, 'files': files, 'bytes': sum(files.values()),
                                                  'seconds': round(time.time() - t0)}, indent=1), encoding='utf-8')
    print(json.dumps({'map': args.region, 'bytes': sum(files.values()), 'files': len(files)}))
    if tmp and tmp.exists():
        tmp.unlink()


if __name__ == '__main__':
    main()
