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
