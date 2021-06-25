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
    console.log("getDataFromTile", elevationTile, tilesToFetchStr);
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
      console.log(url, data, dimensions);
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
