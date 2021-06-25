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

  static pointToTileFraction(lon, lat, z) {
    var sin = Math.sin(lat * (Math.PI / 180)),
      z2 = Math.pow(2, z),
      x = z2 * (lon / 360 + 0.5),
      y = z2 * (0.5 - (0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI);

    // Wrap Tile X
    x = x % z2;
    if (x < 0) x = x + z2;
    return [z, x, y];
  }
  static pointToTile(lon, lat, z) {
    var tile = Utils.pointToTileFraction(lon, lat, z);
    tile[1] = Math.floor(tile[1]);
    tile[2] = Math.floor(tile[2]);
    return tile;
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

  static getElevationGroups(aIdTiles, textureZoom, elevationZoom) {
    let zoomDiff = textureZoom - elevationZoom;
    const elevationsObj = {};
    const elevationsArr = [];
    aIdTiles.forEach((aIdTile) => {
      let aIdElevationTile = [
        elevationZoom,
        Math.floor(aIdTile[1] / Math.pow(2, zoomDiff)),
        Math.floor(aIdTile[2] / Math.pow(2, zoomDiff)),
      ];
      let idElevationTile = Utils.array2str(aIdElevationTile);
      if (elevationsObj[idElevationTile]) {
        elevationsObj[idElevationTile].aIdTextureTiles.push(aIdTile);
      } else {
        elevationsObj[idElevationTile] = {
          aIdElevationTile,
          aIdTextureTiles: [aIdTile],
        };
      }
    });

    return Object.values(elevationsObj);
  }
}
