import turfDestination from "@turf/destination";
import cover from "@mapbox/tile-cover";

export function bboxFromPointAndRadius(center, radius) {
  const polygon = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [[]],
    },
  };

  let origin = {
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: center },
  };
  console.log("turf point ", origin, center);
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

export function array2str(t) {
  return `${t[0]}/${t[1]}/${t[2]}`;
}

export function str2array(str) {
  return str.split("/").map((x) => parseInt(x));
}

// coords epsg:3857 of the top-left of the tile
export function tile2coords([z, x, y]) {
  return [
    -20037508.342789245 + (x * 40075016.68557849) / Math.pow(2, z),
    20037508.342789245 - (y * 40075016.68557849) / Math.pow(2, z),
  ];
}

export function arrayMin(arr) {
  var len = arr.length,
    min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
}

export function arrayMax(arr) {
  var len = arr.length,
    max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
}

export function pointToTileFraction(lon, lat, z) {
  var sin = Math.sin(lat * (Math.PI / 180)),
    z2 = Math.pow(2, z),
    x = z2 * (lon / 360 + 0.5),
    y = z2 * (0.5 - (0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI);

  // Wrap Tile X
  x = x % z2;
  if (x < 0) x = x + z2;
  return [z, x, y];
}
export function pointToTile(lon, lat, z) {
  var tile = pointToTileFraction(lon, lat, z);
  tile[1] = Math.floor(tile[1]);
  tile[2] = Math.floor(tile[2]);
  return tile;
}

// we look for the tiles directly to the right or below
// for joins
export function getNeighbours(tiles) {
  let tilesStr = tiles.map((t) => array2str(t));
  let neighbours = [];

  tiles.forEach((t) => {
    let tileSouth = [t[0], t[1], t[2] + 1];
    let tileEast = [t[0], t[1] + 1, t[2]];
    if (!tilesStr.includes(array2str(tileSouth))) {
      neighbours.push(tileSouth);
    }
    if (!tilesStr.includes(array2str(tileEast))) {
      neighbours.push(tileEast);
    }
  });

  return neighbours;
}

export function computeTextureTiles(
  center,
  distanceFromCenter,
  textureZoom,
  elevationZoom
) {
  const bbox = bboxFromPointAndRadius(center, distanceFromCenter);

  let aIdFinals = cover
    .tiles(bbox.feature.geometry, {
      min_zoom: textureZoom,
      max_zoom: textureZoom,
    })
    .map(([x, y, z]) => [z, x, y])
    .sort();

  let aIdNeighbours = getNeighbours(aIdFinals);

  return {
    aIdOrigin: aIdFinals[0],
    aIdFinals,
    aIdNeighbours,
    idNeighbours: aIdNeighbours.map((t) => array2str(t)),
    bbox: {
      north: aIdFinals[0][2],
      south: aIdFinals[aIdFinals.length - 1][2],
      west: aIdFinals[0][1],
      east: aIdFinals[aIdFinals.length - 1][1],
    },
    elevationGroups: getElevationGroups(
      aIdFinals.concat(aIdNeighbours),
      textureZoom,
      elevationZoom
    ),
  };
}

export function getElevationGroups(aIdTiles, textureZoom, elevationZoom) {
  let zoomDiff = textureZoom - elevationZoom;
  const elevationsObj = {};
  const elevationsArr = [];
  aIdTiles.forEach((aIdTile) => {
    let aIdElevationTile = [
      elevationZoom,
      Math.floor(aIdTile[1] / Math.pow(2, zoomDiff)),
      Math.floor(aIdTile[2] / Math.pow(2, zoomDiff)),
    ];
    let idElevationTile = array2str(aIdElevationTile);
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
