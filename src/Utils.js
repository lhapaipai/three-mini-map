import turfDestination from "@turf/destination";
import { point } from "@turf/helpers";

export default class Utils {
  static bboxFromPointAndRadius(center, radius) {
    const polygon = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[]],
      },
    };

    let origin = point(center);
    const [w, n] = turfDestination(origin, radius, -45).geometry.coordinates;
    const [e, s] = turfDestination(origin, radius, 135).geometry.coordinates;
    polygon.geometry.coordinates[0] = [
      [w, n],
      [e, n],
      [e, s],
      [w, s],
      [w, n],
    ];
    return {
      feature: polygon,
      northWest: [w, n],
      southEast: [e, s],
    };
  }

  static array2str(t) {
    return `${t[0]}/${t[1]}/${t[2]}`;
  }

  static str2array(str) {
    return str.split("/").map((x) => parseInt(x));
  }

  // we look for the tiles directly to the right or below
  // for joins
  static getNeighbours(tiles) {
    let tilesStr = tiles.map((t) => Utils.array2str(t));
    let neighbours = [];

    tiles.forEach((t) => {
      let tileSouth = [t[0], t[1], t[2] + 1];
      let tileEast = [t[0], t[1] + 1, t[2]];
      if (!tilesStr.includes(Utils.array2str(tileSouth))) {
        neighbours.push(tileSouth);
      }
      if (!tilesStr.includes(Utils.array2str(tileEast))) {
        neighbours.push(tileEast);
      }
    });

    return neighbours;
  }

  static getElevationTiles(tiles, textureZoom, elevationZoom) {
    let zoomDiff = textureZoom - elevationZoom;
    const elevationsObj = {};
    const elevationsArr = [];
    tiles.forEach((tile) => {
      let elevationTile = [
        elevationZoom,
        Math.floor(tile[1] / Math.pow(2, zoomDiff)),
        Math.floor(tile[2] / Math.pow(2, zoomDiff)),
      ];
      let elevationTileStr = Utils.array2str(elevationTile);
      if (elevationsObj[elevationTileStr]) {
        elevationsObj[elevationTileStr].tiles.push(tile);
      } else {
        elevationsObj[elevationTileStr] = {
          elevationTile: elevationTile,
          tiles: [tile],
        };
      }
    });

    return Object.values(elevationsObj);
  }
}
