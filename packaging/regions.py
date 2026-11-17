"""Regions with a detailed offline map outside the United States.

The US state maps are cut from federal datasets (see docs/MAPS.md, "What is tied to the United
States"). Elsewhere the only public source is OpenStreetMap, which Geofabrik publishes as one
GeoPackage per region. A region below names the box to cut and the Geofabrik extract it comes from;
tools/build_region_map.py builds the map set and tools/install_map_set.py puts it in a data folder.

A map set made here is drop-in: the app reads it as it reads a US state map. It is not in
downloads.lastbook.org's manifest, so setup will not offer it by itself — install it with the tool,
or publish your own manifest.
"""

REGIONS = {
    'BR-SP': {
        'name_en': 'Brazil — São Paulo',
        'name_pt': 'Brasil — São Paulo',
        'country': 'BR',
        'box': (-53.15, -25.35, -44.15, -19.75),   # west, south, east, north
        'gpkg_region': 'south-america/brazil/sudeste-latest-free.gpkg.zip',
        'place_detail': 'São Paulo, Brasil (OpenStreetMap)',
    },
    'BR-RJ': {
        'name_en': 'Brazil — Rio de Janeiro',
        'name_pt': 'Brasil — Rio de Janeiro',
        'country': 'BR',
        'box': (-44.90, -23.40, -40.95, -20.75),
        'gpkg_region': 'south-america/brazil/sudeste-latest-free.gpkg.zip',
        'place_detail': 'Rio de Janeiro, Brasil (OpenStreetMap)',
    },
    'BR-MG': {
        'name_en': 'Brazil — Minas Gerais',
        'name_pt': 'Brasil — Minas Gerais',
        'country': 'BR',
        'box': (-51.05, -22.95, -39.85, -14.20),
        'gpkg_region': 'south-america/brazil/sudeste-latest-free.gpkg.zip',
        'place_detail': 'Minas Gerais, Brasil (OpenStreetMap)',
    },
    'BR-ES': {
        'name_en': 'Brazil — Espírito Santo',
        'name_pt': 'Brasil — Espírito Santo',
        'country': 'BR',
        'box': (-41.90, -21.35, -39.65, -17.85),
        'gpkg_region': 'south-america/brazil/sudeste-latest-free.gpkg.zip',
        'place_detail': 'Espírito Santo, Brasil (OpenStreetMap)',
    },
}


def get(code):
    try:
        return REGIONS[code]
    except KeyError:
        raise SystemExit(f'unknown region {code!r}; known: {", ".join(sorted(REGIONS))}')


def listing():
    """What setup and the docs show: one row per region, in the person's language when known."""
    return [{'id': code, 'title': r['name_en'], 'title_pt': r['name_pt'], 'country': r['country']}
            for code, r in sorted(REGIONS.items())]
