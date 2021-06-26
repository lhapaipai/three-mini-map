import Utils from "./Utils";
import ElevationManager from "./ElevationManager";
import TileGeometry from "./TileGeometry";
import cover from "@mapbox/tile-cover";
import sources from "./sources";
import * as THREE from "three";

class ThreeMapManager extends THREE.EventDispatcher {
  constructor(config) {
    super();

    this.config = Object.assign({}, ThreeMapManager.defaultConfig, config);

    this.elevationSourceConfig =
      sources.elevation[this.config.elevationSourceName];

    this.loadManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadManager);
  }

  async getMap(mapConfig) {
    let {
      textureSourceName,
      tileSegments,
      textureZoom,
      center,
      distanceFromCenter,
    } = Object.assign({}, ThreeMapManager.mapDefaultConfig, mapConfig);

    // ex : - earth circumference
    //      40075016 meters * tileResolution (0.00000002 for zoom 0) => 1 unit
    //      - useful for computation of elevation data inside geometry
    //      512 meters * tileResolution (0.0008176 for zoom 15) => 0.4

    let tileResolution =
      (this.config.tileUnits * Math.pow(2, textureZoom)) / 40075016.68557849;

    let elevationZoom =
      textureZoom - Math.log2(this.elevationSourceConfig.size / tileSegments);
    if (elevationZoom > this.elevationSourceConfig.maxZoom) {
      throw new Exception(
        `elevation segments: ${tileSegments} unavailables for this zoom: ${textureZoom}, choose less segments`
      );
    }

    this.elevationManager = new ElevationManager(
      this.elevationSourceConfig,
      elevationZoom,
      textureZoom
    );

    let textureSourceConfig = sources.texture[textureSourceName];

    const bbox = Utils.bboxFromPointAndRadius(center, distanceFromCenter);

    const aIdTiles = cover
      .tiles(bbox.feature.geometry, {
        min_zoom: textureZoom,
        max_zoom: textureZoom,
      })
      .map(([x, y, z]) => [z, x, y])
      .sort();

    let aIdOriginTile = aIdTiles[0];

    let group = new THREE.Group();

    const aIdNeighbours = Utils.getNeighbours(aIdTiles);

    const elevationGroups = Utils.getElevationGroups(
      aIdTiles.concat(aIdNeighbours),
      textureZoom,
      elevationZoom
    );

    if (this.config.debug) {
      console.info(
        `location: (${center}), origin tile: ${Utils.array2str(aIdOriginTile)}`
      );
      console.info(`bbox: (nw: ${bbox.northWest}, se: ${bbox.southEast})`);
      console.info(
        `textures tiles: ${aIdTiles.length}, neighbours: ${aIdNeighbours.length}, elevationsTiles: ${elevationGroups.length}`,
        aIdTiles.map((t) => Utils.array2str(t)),
        aIdNeighbours.map((t) => Utils.array2str(t)),
        elevationGroups.map((t) => Utils.array2str(t.aIdElevationTile))
      );
    }
    if (this.config.dryRun) {
      console.info(
        "textures tiles load\n",
        aIdTiles
          .concat(aIdNeighbours)
          .map((t) => Utils.array2str(t))
          .join("\n")
      );
      console.info(
        "elevation tiles\n",
        elevationGroups
          .map((t) => Utils.array2str(t.aIdElevationTile))
          .join("\n")
      );
    }

    const textureTilesFullfilled =
      await this.elevationManager.getDataFromElevationTiles(
        elevationGroups,
        aIdNeighbours.map((t) => Utils.array2str(t))
      );
    let minElevation = Utils.arrayMin(textureTilesFullfilled.map((t) => t.min));
    let maxElevation = Utils.arrayMax(textureTilesFullfilled.map((t) => t.max));
    let zResolution = tileResolution * this.config.zScaleFactor;
    group.userData.mapBox = {
      x: aIdTiles[aIdTiles.length - 1][1] - aIdOriginTile[1] + 1,
      y: aIdTiles[aIdTiles.length - 1][2] - aIdOriginTile[2] + 1,
      z:
        (maxElevation - minElevation) *
        tileResolution *
        this.config.zScaleFactor,
      offsetZ: minElevation * zResolution,
    };
    group.userData.origin = Utils.tile2coords(aIdOriginTile);
    group.userData.resolution = tileResolution;
    group.userData.zResolution = zResolution;

    if (this.config.debug) {
      console.info(
        `texture tiles fullfilled:`,
        textureTilesFullfilled,
        `min elevation: `,
        minElevation
      );
      console.info(
        `mapBBox: (${group.userData.mapBox.x},${group.userData.mapBox.y},${group.userData.mapBox.z})`,
        `offsetZ: (${group.userData.mapBox.offsetZ})`,
        `origin: (${group.userData.origin})`,
        `tileResolution: ${tileResolution}`
      );
    }
    if (this.config.dryRun) {
      return;
    }
    textureTilesFullfilled.forEach((tile) => {
      let geom = new TileGeometry(
        tile,
        tileResolution * this.config.zScaleFactor,
        minElevation
      );
      // geom.computeVertexNormals();
      let texture = this.textureLoader.load(
        // "https://threejs.org/examples/textures/uv_grid_opengl.jpg"
        textureSourceConfig.url(...tile.aId, textureSourceConfig.token)
      );
      let material = new THREE.MeshBasicMaterial({
        map: texture,
        // wireframe: true,
        // color: 0xcccccc,
      });

      let mesh = new THREE.Mesh(geom, material);
      this.config.debug && mesh.add(new THREE.AxesHelper(1));
      let offsetX = tile.aId[1] - aIdOriginTile[1];
      let offsetY = aIdOriginTile[2] - tile.aId[2];
      mesh.position.set(offsetX, offsetY, 0);
      mesh.userData.id = tile.id;
      group.add(mesh);
    });

    this.$loader = document.getElementById("loader");
    this.$loaderContent = document.getElementById("loader-content");
    this.loadManager.onLoad = () => {
      this.$loader.classList.add("hidden");
      this.dispatchEvent({ type: "dispose" });
    };
    this.loadManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.$loaderContent.innerText = itemsLoaded + "/" + itemsTotal;
    };
    return group;
  }
}

ThreeMapManager.defaultConfig = {
  elevationSourceName: "localElevation",
  zScaleFactor: 1.6,
  tileUnits: 1.0,
  debug: false,
  dryRun: false,
};

ThreeMapManager.mapDefaultConfig = {
  textureSourceName: "localOSM",
  tileSegments: 32, // doit être une puissance de 2
  textureZoom: 15,
  center: [6.4751, 46.1024],
  distanceFromCenter: 1, // distance en km
};

export default ThreeMapManager;
