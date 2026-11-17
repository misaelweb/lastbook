"""Builder-side view of the regions the app offers (engine/regions.py).

One registry, so setup and the builder cannot drift apart: a region's box, the Geofabrik extract it is
cut from, and the name, size and SHA-256 of the zip setup installs.

    python3 tools/build_region_map.py --region BR-SP --gpkg sudeste-latest-free.gpkg.zip --out derived/packs/maps/BR-SP
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from engine.regions import REGIONS, get, listing  # noqa: E402,F401
