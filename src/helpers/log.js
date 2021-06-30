import * as Utils from "./utils";

export function mapLog(center, tilesInfos, tilesData, elevations, resolution) {
  // let objectData = this.objectContainer.userData;
  console.info("tilesInfos", tilesInfos);
  console.info(
    `location: (${center}), origin tile: ${Utils.array2str(
      tilesInfos.aIdOrigin
    )}, bbox tiles: (n:${tilesInfos.bbox.north},s:${tilesInfos.bbox.south},w:${
      tilesInfos.bbox.west
    },e:${tilesInfos.bbox.east})`
  );
  console.info(
    `textures tiles: ${tilesInfos.aIdFinals.length}, neighbours: ${tilesInfos.aIdNeighbours.length}, elevationsTiles: ${tilesInfos.elevationGroups.length}`,
    tilesInfos.aIdFinals.map((t) => Utils.array2str(t)),
    tilesInfos.aIdNeighbours.map((t) => Utils.array2str(t)),
    tilesInfos.elevationGroups.map((t) => Utils.array2str(t.aIdElevationTile))
  );
  console.info(
    `texture tiles fullfilled:`,
    tilesData,
    `min elevation: `,
    elevations.min
  );
  console.info(
    // `mapBBox: (${objectData.mapBox.x},${objectData.mapBox.y},${objectData.mapBox.z})`,
    // `origin: (${objectData.origin})`,
    `zOffset: (${resolution.zOffset})`,
    `xyResolution: ${resolution.xy}`
  );
}

export function dryRunLog(tilesInfos) {
  console.info(
    "textures tiles load\n",
    tilesInfos.aIdFinals
      .concat(tilesInfos.aIdNeighbours)
      .map((t) => Utils.array2str(t))
      .join("\n")
  );
  console.info(
    "elevation tiles\n",
    tilesInfos.elevationGroups
      .map((t) => Utils.array2str(t.aIdElevationTile))
      .join("\n")
  );
}

export function pathRaycastLog(coordinates) {
  console.log("path raycast log");
  console.log(JSON.stringify(coordinates));
}
