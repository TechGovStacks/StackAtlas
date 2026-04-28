#!/usr/bin/env python3
"""
Fixes property order in item JSON files:
- Moves lastResearchDate BEFORE researchSources
"""

import json
import os
from pathlib import Path

ITEMS_DIR = Path(__file__).parent / "data" / "items"

def fix_property_order(data):
    """Reorder properties: lastResearchDate before researchSources"""
    result = {}
    last_research_date = None
    research_sources = None

    for key, value in data.items():
        if key == "lastResearchDate":
            last_research_date = value
        elif key == "researchSources":
            research_sources = value
        else:
            result[key] = value
            # Insert lastResearchDate before researchSources
            if key == "homepage" and last_research_date is not None:
                result["lastResearchDate"] = last_research_date
                last_research_date = None

    # Add researchSources at the end if we haven't added it yet
    if research_sources is not None:
        result["researchSources"] = research_sources

    # Add any remaining properties
    if last_research_date is not None:
        result["lastResearchDate"] = last_research_date

    return result

def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Check if reordering is needed
    keys = list(data.keys())
    if "lastResearchDate" not in keys or "researchSources" not in keys:
        return False

    last_idx = keys.index("lastResearchDate")
    src_idx = keys.index("researchSources")

    if last_idx < src_idx:
        # Already correct order
        return False

    # Fix the order
    new_data = fix_property_order(data)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(new_data, f, ensure_ascii=False, indent="\t")
        f.write("\n")

    return True

def main():
    json_files = sorted(ITEMS_DIR.glob("*.json"))
    fixed = 0

    for path in json_files:
        if process_file(path):
            item_id = path.stem
            print(f"✓ {item_id}")
            fixed += 1

    print(f"\nFixed: {fixed} files")

if __name__ == "__main__":
    main()
