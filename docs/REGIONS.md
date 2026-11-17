# Detailed maps outside the United States

The US state maps are cut from datasets that only exist for the US: USGS terrain and hydrography,
Census gazetteers, USDA crops, Microsoft buildings (see [MAPS.md](MAPS.md), "What is tied to the
United States"). Outside the US the public source for everything the map draws is OpenStreetMap,
which Geofabrik publishes as one GeoPackage per region.

`tools/build_region_map.py` turns such a GeoPackage into the file layout `server.py` already reads,
so no engine change is needed:

| File | Tables | Built from |
|---|---|---|
| `derived/geo/national.sqlite` | `feat`, `feat_idx`, `poi`, `meta` | OSM roads, water, land use, waterways, railways, places, help points |
| `derived/geo/places.sqlite` | `place`, `place_fts` | named OSM places and POIs (the place finder) |
| `derived/geo/map.sqlite` | empty schema | the engine always opens this file |

Buildings, terrain, crops and `atlas.sqlite` are left out. The app asks `/api/map/info` what a map
set holds (`map_contents` in `server.py`) and offers only the layers that have data, so an absent
file means an absent layer, not an error.

## Regions

Every region is a box (`west, south, east, north`) and the Geofabrik extract it is cut from, in
[`packaging/regions.py`](../packaging/regions.py). São Paulo is registered as `BR-SP`; Rio de
Janeiro, Minas Gerais and Espírito Santo come from the same Sudeste extract.

```bash
python3 tools/build_region_map.py --region BR-SP \
  --gpkg sudeste-latest-free.gpkg.zip --out derived/packs/maps/BR-SP
python3 tools/install_map_set.py --data /path/to/LastbookData --set derived/packs/maps/BR-SP
```

The box is the same idea the US state maps use (a padded box around the state's populated places),
so a little of a neighbouring state can be included; nothing is inferred about where the person is.

## What the region map is not

- **No address search.** `engine/address_search.py` reads a per-state index built from Overture
  addresses and knows US state names and street words. Place search (`/api/places`) works, and finds
  towns and named places in the region.
- **No offline address index, terrain, buildings or crops**, for the same reason: those datasets do
  not exist for this area.
- **Not in the published manifest.** Setup lists maps from `downloads.lastbook.org`'s
  `manifest-v1.json`, so a locally built set is installed with `tools/install_map_set.py`. Publishing
  your own files and manifest makes it appear in setup like any state map.

## Checking a build

`tools/install_map_set.py --dry-run` checks `map-set.json` against the files on disk and prints the
feature and pin counts. In the app, open Map, press **All**, and confirm the map fits the region and
that help pins appear when zoomed in.

Data © OpenStreetMap contributors, ODbL 1.0.
