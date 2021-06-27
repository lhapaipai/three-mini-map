import ElevationManager from "./ElevationManager";
import BasementBuilder from "./BasementBuilder";
import TileGeometry from "./TileGeometry";
import cover from "@mapbox/tile-cover";
import sources from "./sources";
import * as THREE from "three";
import * as Utils from "./helpers/utils";

class ThreeMapManager extends THREE.EventDispatcher {
  constructor(config) {
    super();

    this.config = Object.assign({}, ThreeMapManager.defaultConfig, config);

    if (typeof this.config.elevationSource === "string") {
      this.config.elevationSource =
        sources.elevation[this.config.elevationSource];
    }

    this.loadManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadManager);
  }

  async getMap(mapConfig) {
    let {
      textureSource,
      tileSegments,
      textureZoom,
      center,
      distanceFromCenter,
    } = Object.assign({}, ThreeMapManager.mapDefaultConfig, mapConfig);

    // ex : - earth circumference
    //      40075016 meters * xyResolution (0.00000002 for zoom 0) => 1 unit
    //      - useful for computation of elevation data inside geometry
    //      512 meters * xyResolution (0.0008176 for zoom 15) => 0.4

    let xyResolution =
      (this.config.tileUnits * Math.pow(2, textureZoom)) / 40075016.68557849;

    let elevationZoom =
      textureZoom - Math.log2(this.config.elevationSource.size / tileSegments);
    if (elevationZoom > this.config.elevationSource.maxZoom) {
      throw new Exception(
        `elevation segments: ${tileSegments} unavailables for this zoom: ${textureZoom}, choose less segments`
      );
    }

    this.elevationManager = new ElevationManager(
      this.config.elevationSource,
      elevationZoom,
      textureZoom
    );

    if (typeof textureSource === "string") {
      textureSource = sources.texture[textureSource];
    }
    if (typeof textureSource === "function") {
      textureSource = {
        url: textureSource,
        size: 256,
      };
    }

    const bbox = Utils.bboxFromPointAndRadius(center, distanceFromCenter);

    const aIdTiles = cover
      .tiles(bbox.feature.geometry, {
        min_zoom: textureZoom,
        max_zoom: textureZoom,
      })
      .map(([x, y, z]) => [z, x, y])
      .sort();

    const bboxTiles = {
      north: aIdTiles[0][2],
      south: aIdTiles[aIdTiles.length - 1][2],
      west: aIdTiles[0][1],
      east: aIdTiles[aIdTiles.length - 1][1],
    };

    let aIdOriginTile = aIdTiles[0];

    this.objectContainer = new THREE.Group();

    const aIdNeighbours = Utils.getNeighbours(aIdTiles);

    const elevationGroups = Utils.getElevationGroups(
      aIdTiles.concat(aIdNeighbours),
      textureZoom,
      elevationZoom
    );

    const textureTilesFullfilled =
      await this.elevationManager.getDataFromElevationTiles(
        elevationGroups,
        aIdNeighbours.map((t) => Utils.array2str(t))
      );

    let minElevation = Utils.arrayMin(textureTilesFullfilled.map((t) => t.min));
    let maxElevation = Utils.arrayMax(textureTilesFullfilled.map((t) => t.max));
    let zResolution = xyResolution * this.config.zScaleFactor;
    let zOffset = minElevation * zResolution - this.config.basementHeight;

    this.objectContainer.userData = {
      mapBox: {
        x: aIdTiles[aIdTiles.length - 1][1] - aIdOriginTile[1] + 1,
        y: aIdTiles[aIdTiles.length - 1][2] - aIdOriginTile[2] + 1,
        z:
          (maxElevation - minElevation) * zResolution +
          this.config.basementHeight,
      },
      zOffset,
      origin: Utils.tile2coords(aIdOriginTile),
      resolution: xyResolution,
      zResolution: zResolution,
    };

    if (this.config.debug || this.config.dryRun) {
      /* prettier-ignore */
      this.log(center,bboxTiles,aIdOriginTile,bbox,aIdTiles,aIdNeighbours,elevationGroups,textureTilesFullfilled,minElevation,xyResolution);
    }

    textureTilesFullfilled.forEach((tile) => {
      tile.geom = new TileGeometry(tile, zResolution, zOffset);
      tile.geom.computeVertexNormals();
    });

    this.elevationManager.joinNormals(textureTilesFullfilled);

    textureTilesFullfilled.forEach((tile) => {
      let texture = this.textureLoader.load(
        textureSource.url(...tile.aId, textureSource.token)
      );
      let material = new THREE.MeshLambertMaterial({
        map: texture,
        // emissive: 0x222222,
        // wireframe: true,
        color: 0xffffff,
      });

      let mesh = new THREE.Mesh(tile.geom, material);
      this.config.debug && mesh.add(new THREE.AxesHelper(1));
      let offsetX = tile.aId[1] - aIdOriginTile[1];
      let offsetY = aIdOriginTile[2] - tile.aId[2];
      mesh.position.set(offsetX, offsetY, 0);
      mesh.userData.id = tile.id;
      this.objectContainer.add(mesh);
    });

    let basementMeshes = BasementBuilder.computeBasement(
      textureTilesFullfilled,
      bboxTiles,
      zResolution,
      zOffset
    );
    basementMeshes.forEach((m) => this.objectContainer.add(m));

    this.$loader = document.getElementById("loader");
    this.$loaderContent = document.getElementById("loader-content");
    this.loadManager.onLoad = () => {
      this.$loader.classList.add("hidden");
      this.dispatchEvent({ type: "dispose" });
    };
    this.loadManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.$loaderContent.innerText = itemsLoaded + "/" + itemsTotal;
    };
    return this.objectContainer;
  }

  /* prettier-ignore */
  log(center,bboxTiles, aIdOriginTile,bbox,aIdTiles,aIdNeighbours,elevationGroups,textureTilesFullfilled,minElevation,xyResolution) {
    let objectData = this.objectContainer.userData;
    console.info(
      `location: (${center}), origin tile: ${Utils.array2str(aIdOriginTile)}, bbox tiles: (n:${bboxTiles.north},s:${bboxTiles.south},w:${bboxTiles.west},e:${bboxTiles.east})`
    );
    console.info(`bbox: (nw: ${bbox.northWest}, se: ${bbox.southEast})`);
    console.info(
      `textures tiles: ${aIdTiles.length}, neighbours: ${aIdNeighbours.length}, elevationsTiles: ${elevationGroups.length}`,
      aIdTiles.map((t) => Utils.array2str(t)),
      aIdNeighbours.map((t) => Utils.array2str(t)),
      elevationGroups.map((t) => Utils.array2str(t.aIdElevationTile))
    );
    console.info(
      `texture tiles fullfilled:`,
      textureTilesFullfilled,
      `min elevation: `,
      minElevation
    );
    console.info(
      `mapBBox: (${objectData.mapBox.x},${objectData.mapBox.y},${objectData.mapBox.z})`,
      `zOffset: (${objectData.zOffset})`,
      `origin: (${objectData.origin})`,
      `xyResolution: ${xyResolution}`
    );

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
      return;
    }
  }
}

ThreeMapManager.defaultConfig = {
  elevationSource: "terrarium",
  zScaleFactor: 1.6,
  tileUnits: 1.0,
  debug: false,
  dryRun: false,
  basementHeight: 0.05,
};

ThreeMapManager.mapDefaultConfig = {
  textureSourceName: "localOSM",
  tileSegments: 32, // doit être une puissance de 2
  textureZoom: 15,
  center: [6.4751, 46.1024],
  distanceFromCenter: 1, // distance en km
};

export default ThreeMapManager;
