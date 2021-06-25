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
      (this.config.tileUnits * Math.pow(2, textureZoom)) / 40075016;

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

    let centerTile = Utils.pointToTile(center[0], center[1], textureZoom);

    const bbox = Utils.bboxFromPointAndRadius(center, distanceFromCenter);

    const aIdTiles = cover
      .tiles(bbox.feature.geometry, {
        min_zoom: textureZoom,
        max_zoom: textureZoom,
      })
      .map(([x, y, z]) => [z, x, y]);

    const aIdNeighbours = Utils.getNeighbours(aIdTiles);

    const elevationGroups = Utils.getElevationGroups(
      aIdTiles.concat(aIdNeighbours),
      textureZoom,
      elevationZoom
    );

    if (this.config.debug) {
      console.info(
        `location: (${center}), tile: ${Utils.array2str(
          centerTile
        )}, tileResolution: ${tileResolution}`
      );
      console.info(`bbox: (nw: ${bbox.northWest}, se: ${bbox.southEast})`);
      console.info(
        `textures tiles: ${aIdTiles.length}, neighbours: ${aIdNeighbours.length}, elevationsTiles: ${elevationGroups.length}`,
        aIdTiles.map((t) => Utils.array2str(t)),
        aIdNeighbours.map((t) => Utils.array2str(t)),
        elevationGroups.map((t) => Utils.array2str(t.aIdElevationTile))
      );
    }

    const tilesFetched = await this.elevationManager.getDataFromTiles(
      elevationGroups,
      aIdNeighbours.map((t) => Utils.array2str(t))
    );
    this.config.debug && console.info(`tiles fetched`, tilesFetched);
    let group = new THREE.Group();
    tilesFetched.forEach((tile) => {
      let geom = new TileGeometry(
        tile,
        tileResolution * this.config.zScaleFactor
      );
      geom.computeVertexNormals();
      let texture = this.textureLoader.load(
        textureSourceConfig.url(...tile.aId, textureSourceConfig.token)
      );
      let material = new THREE.MeshStandardMaterial({
        // map: texture,
        // wireframe: true,
        color: 0xcccccc,
      });

      let mesh = new THREE.Mesh(geom, material);
      let offsetX = tile.aId[1] - centerTile[1];
      let offsetY = centerTile[2] - tile.aId[2];
      mesh.position.set(offsetX, offsetY, 0);
      group.add(mesh);
    });
    this.loadManager.onLoad = () => {
      this.dispatchEvent({ type: "dispose" });
    };
    return group;
  }
}

ThreeMapManager.defaultConfig = {
  elevationSourceName: "localElevation",
  zScaleFactor: 1.6,
  tileUnits: 1.0,
  debug: false,
};

ThreeMapManager.mapDefaultConfig = {
  textureSourceName: "localOSM",
  tileSegments: 32, // doit être une puissance de 2
  textureZoom: 15,
  center: [6.4751, 46.1024],
  distanceFromCenter: 1, // distance en km
};

export default ThreeMapManager;
