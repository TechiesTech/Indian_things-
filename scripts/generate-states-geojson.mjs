/**
 * Properly dissolves district-level GeoJSON into state-level shapes
 * by using @turf/union to merge all districts of each state into one geometry.
 * Output: public/india_states.geojson
 */

import { readFileSync, writeFileSync } from "fs";
import union from "@turf/union";
import { featureCollection, feature as turfFeature } from "@turf/helpers";

const raw = readFileSync("public/india.geojson", "utf8");
const districtGeo = JSON.parse(raw);

// Group features by state name
const stateGroups = new Map();
for (const feat of districtGeo.features) {
  const state = feat.properties.st_nm ?? "";
  if (!state) continue;
  if (!stateGroups.has(state)) stateGroups.set(state, []);
  stateGroups.get(state).push(feat);
}

console.log(`Processing ${stateGroups.size} states...`);

const mergedFeatures = [];

for (const [stateName, features] of stateGroups.entries()) {
  process.stdout.write(`  Merging: ${stateName} (${features.length} districts)... `);
  
  try {
    let merged = features[0];
    
    for (let i = 1; i < features.length; i++) {
      const result = union(
        featureCollection([merged, features[i]])
      );
      if (result) {
        merged = result;
      }
    }
    
    merged.properties = { st_nm: stateName };
    mergedFeatures.push(merged);
    console.log("✓");
  } catch (err) {
    console.log(`⚠ Error: ${err.message} — using simple MultiPolygon fallback`);
    // Fallback: collect all rings into MultiPolygon
    const allRings = [];
    for (const feat of features) {
      if (feat.geometry.type === "Polygon") {
        allRings.push(feat.geometry.coordinates);
      } else if (feat.geometry.type === "MultiPolygon") {
        allRings.push(...feat.geometry.coordinates);
      }
    }
    mergedFeatures.push({
      type: "Feature",
      properties: { st_nm: stateName },
      geometry: { type: "MultiPolygon", coordinates: allRings },
    });
  }
}

const result = featureCollection(mergedFeatures);

writeFileSync("public/india_states.geojson", JSON.stringify(result), "utf8");
console.log(`\n✅ Done — ${mergedFeatures.length} state features written to public/india_states.geojson`);
