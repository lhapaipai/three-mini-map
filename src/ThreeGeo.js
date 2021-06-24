import Utils from "./Utils";
import cover from "@mapbox/tile-cover";

export default class ThreeGeo {
  constructor(config) {
    const defaultConfig = {
      apiTexture: "osm",
      textureZoom: 11,
      apiElevation: "localElevation",
      tileSegments: 64, // doit être une puissance de 2
      zScale: 0.05,
      distanceFromCenter: 5, // distance en km
      center: [6.4751, 46.1024],
    };
    this.config = Object.assign({}, defaultConfig, config);

    let { textureZoom, tileSegments } = this.config;

    this.elevationZoom = textureZoom - Math.log2(256 / tileSegments);

    this.init();
  }

  init() {
    console.log("hello");
    let { center, distanceFromCenter, textureZoom } = this.config;
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
  }
}
