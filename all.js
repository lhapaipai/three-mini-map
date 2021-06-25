import Utils from "./Utils";
import ElevationManager from "./ElevationManager";
import TileGeometry from "./TileGeometry";
import cover from "@mapbox/tile-cover";
import urls from "./urls";
import * as THREE from "three";

export default class ThreeMapManager extends THREE.EventDispatcher {
  constructor(config) {
    super();

    const defaultConfig = {
      apiElevation: "localElevation",
      zScaleFactor: 1.6,
      tileUnits: 1.0,
    };
    this.config = Object.assign({}, defaultConfig, config);

    this.apiElevationConfig = urls[this.config.apiElevation];

    this.loadManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadManager);
  }

  getZScale() {
    return this.scale * this.config.zScaleFactor;
  }

  async getMap(mapConfig) {
    const mapDefaultConfig = {
      apiTexture: "localOSM",
      tileSegments: 32, // doit être une puissance de 2
      textureZoom: 15,
      center: [6.4751, 46.1024],
      distanceFromCenter: 1, // distance en km
    };
    let { apiTexture, tileSegments, textureZoom, center, distanceFromCenter } =
      Object.assign({}, mapDefaultConfig, mapConfig);

    this.scale = (this.config.tileUnits * Math.pow(2, textureZoom)) / 40075016;
    console.log("scale", this.scale);

    let divisions = Math.log2(this.apiElevationConfig.size[0] / tileSegments);
    this.elevationZoom = textureZoom - divisions;

    this.elevationManager = new ElevationManager(
      this.apiElevationConfig,
      divisions
    );

    let apiTextureConfig = urls[apiTexture];

    let centerTile = Utils.pointToTile(center[0], center[1], textureZoom);
    console.log("centerTile", centerTile);

    const bbox = Utils.bboxFromPointAndRadius(center, distanceFromCenter);
    console.log(bbox);

    const tiles = cover
      .tiles(bbox.feature.geometry, {
        min_zoom: textureZoom,
        max_zoom: textureZoom,
      })
      .map(([x, y, z]) => [z, x, y]);
    console.log(
      "tiles to load",
      tiles.map((t) => Utils.array2str(t))
    );

    const neighbours = Utils.getNeighbours(tiles);
    console.log(
      "neighbours",
      neighbours.map((t) => Utils.array2str(t))
    );
    const elevationTiles = Utils.getElevationTiles(
      tiles.concat(neighbours),
      textureZoom,
      this.elevationZoom
    );
    console.log("elevationTiles", elevationTiles);
    console.log(
      "elevationTiles",
      elevationTiles.map((t) => Utils.array2str(t.elevationTile))
    );

    const elevationData = await this.elevationManager.getDataFromTiles(
      elevationTiles,
      neighbours.map((t) => Utils.array2str(t))
    );
    console.log("foo:", elevationData);
    let group = new THREE.Group();
    elevationData.forEach((tile) => {
      let geom = new TileGeometry(tile, this.scale * this.config.zScaleFactor);
      // geom.computeVertexNormals();
      let texture = this.textureLoader.load(
        apiTextureConfig.url(
          ...Utils.str2array(tile.tile),
          apiTextureConfig.token
        )
      );
      let material = new THREE.MeshBasicMaterial({
        map: texture,
        // wireframe: true,
        // color: 0xcccccc,
      });
      let mesh = new THREE.Mesh(geom, material);
      let tileId = Utils.str2array(tile.tile);
      let offsetX = tileId[1] - centerTile[1];
      let offsetY = centerTile[2] - tileId[2];
      mesh.position.set(offsetX, offsetY, 0);
      group.add(mesh);
    });
    this.loadManager.onLoad = () => {
      console.log("all textures loaded");
      this.dispatchEvent({ type: "dispose" });
    };
    return group;
  }
}
//////////////////////////////////////////////////
import getPixels from "./helpers/get-pixels";
import Utils from "./Utils";
export default class ElevationManager {
  constructor(config, divisions, zScale) {
    this.config = config;
    this.zScale = zScale;

    this.divisions = divisions;
    this.subdivisions = Math.pow(2, divisions);
    this.ranges = this.getRanges(config.size, this.subdivisions);
    console.log("ranges", this.ranges);
  }
  /*
      tileID
      0         1         2         3
      [0,64]    [64,128]  [128,192] [192,256]
      [0,64]    [0,64]    [0,64]    [0,64]

      4         id
      [0,64]    [w,e]
      [64,128]  [n,s]
  */
  getRanges(size, scaleFactor) {
    let cols = size[0];
    let rows = size[1];
    let ranges = [];
    for (let c = 0; c < scaleFactor; c++) {
      for (let r = 0; r < scaleFactor; r++) {
        ranges.push([
          [r * (rows / scaleFactor - 1) + r, ((r + 1) * rows) / scaleFactor],
          [c * (cols / scaleFactor - 1) + c, ((c + 1) * cols) / scaleFactor],
        ]);
      }
    }
    return ranges;
  }

  async getDataFromTiles(elevationTiles, neighboursStr) {
    let promises = elevationTiles.map(
      ({ elevationTile, tiles: tilesToFetch }) => {
        return new Promise((resolv) => {
          this.getDataFromTile(
            elevationTile,
            tilesToFetch,
            neighboursStr,
            resolv
          );
        });
      }
    );
    let data = await Promise.all(promises);

    // once we have all the elevation tiles loaded, we get the jointures.
    let tiles = [].concat(...data);
    let indexById = {};
    tiles.forEach((t, i) => {
      indexById[t.tile] = i;
    });
    let requestedTiles = tiles.filter((t) => t.elevations);

    requestedTiles.forEach((t) => {
      let tileIdArr = Utils.str2array(t.tile);
      let east = Utils.array2str([
        tileIdArr[0],
        tileIdArr[1] + 1,
        tileIdArr[2],
      ]);
      let south = Utils.array2str([
        tileIdArr[0],
        tileIdArr[1],
        tileIdArr[2] + 1,
      ]);
      let se = Utils.array2str([
        tileIdArr[0],
        tileIdArr[1] + 1,
        tileIdArr[2] + 1,
      ]);
      let vertices = t.segments + 1;
      for (let row = 0; row < t.segments; row++) {
        t.elevations[row * vertices + vertices - 1] =
          tiles[indexById[east]].west[row];
      }
      for (let col = 0; col < t.segments; col++) {
        t.elevations[(vertices - 1) * vertices + col] =
          tiles[indexById[south]].north[col];
      }
      t.elevations[t.elevations.length - 1] = t.east =
        tiles[indexById[east]].west;
      t.south = tiles[indexById[south]].north;
      if (indexById[se]) {
        t.se = tiles[indexById[se]].nw;
        t.elevations[t.elevations.length - 1] = tiles[indexById[se]].nw;
      } else {
        // console.log("s.e. calculated");
        t.se = (t.east[t.east.length - 1] + t.south[t.south.length - 1]) / 2;
        t.elevations[t.elevations.length - 1] = t.se;
      }
      // console.log(t.tile, east, south, se);
    });
    return requestedTiles;
  }

  getDataFromTile(elevationTile, tilesToFetch, neighboursStr, cb) {
    let tilesToFetchStr = tilesToFetch.map((t) => Utils.array2str(t));
    // console.log("getDataFromTile", elevationTile, tilesToFetchStr);
    let url = this.config.url(...elevationTile, this.config.token);

    let idCase2tile = [];
    for (let row = 0; row < this.subdivisions; row++) {
      for (let col = 0; col < this.subdivisions; col++) {
        idCase2tile.push(
          [
            elevationTile[0] + this.divisions,
            elevationTile[1] * this.subdivisions + col,
            elevationTile[2] * this.subdivisions + row,
          ].join("/")
        );
      }
    }

    getPixels(url, (err, data, dimensions) => {
      if (err) console.error(err);
      // console.log(url, data, dimensions);
      let elevationTiles = [];
      let counter;
      idCase2tile.forEach((tileStr, idCase) => {
        counter = 0;
        // si notre tuile d'élévation ne nous intéresse pas
        if (!tilesToFetchStr.includes(tileStr)) return;

        if (tileStr === "11/1061/727") {
          console.log("tile mauvaise");
        }
        let range = this.ranges[idCase];
        let segments = range[0][1] - range[0][0];
        let elevationsBak = null;
        let elevations = null;

        if (!neighboursStr.includes(tileStr)) {
          elevationsBak = new Float32Array(segments * segments);
          elevations = new Float32Array((segments + 1) * (segments + 1));
          for (let row = range[1][0]; row < range[1][1]; row++) {
            for (let col = range[0][0]; col < range[0][1]; col++) {
              // first the row, second the col, third the rvba
              let r = data.get(row, col, 0);
              let g = data.get(row, col, 1);
              let b = data.get(row, col, 2);
              elevations[counter] = r * 256 + g + b / 256 - 32768;
              counter++;
              if (col === range[0][1] - 1) {
                elevations[counter] = 0;
                counter++;
              }
            }
          }
        }

        let north = new Float32Array(segments);
        let west = new Float32Array(segments);
        counter = 0;
        for (let col = range[0][0]; col < range[0][1]; col++) {
          let r = data.get(range[1][0], col, 0);
          let g = data.get(range[1][0], col, 1);
          let b = data.get(range[1][0], col, 2);
          north[counter] = r * 256 + g + b / 256 - 32768;
          counter++;
        }
        counter = 0;
        for (let row = range[1][0]; row < range[1][1]; row++) {
          let r = data.get(row, range[0][0], 0);
          let g = data.get(row, range[0][0], 1);
          let b = data.get(row, range[0][0], 2);
          west[counter] = r * 256 + g + b / 256 - 32768;
          counter++;
        }
        elevationTiles.push({
          tile: tileStr,
          elevations,
          north,
          west,
          nw: north[0],
          segments,
        });
      });
      cb(elevationTiles);
    });
  }
}
//////////////////////////////////////////////////
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
//////////////////////////////////////////////////
const infos = {
  url: (z, x, y, token) =>
    `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}@2x.pngraw?access_token=${token}`,
  token: process.env.TOKEN_MAPBOX,
  epsg: "3857",
  size: [512, 512],
  maxZoom: 15,
};