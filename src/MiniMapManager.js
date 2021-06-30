import ElevationManager from "./ElevationManager";
import BasementBuilder from "./BasementBuilder";
import TileGeometry from "./TileGeometry";
import sources from "./sources";
import { dryRunLog, mapLog } from "./helpers/log";
import * as THREE from "three";
import * as Utils from "./helpers/utils";
import MapLoader from "./helpers/MapLoader";

class MiniMapManager extends THREE.EventDispatcher {
  constructor(config, mapLoader) {
    super();

    if (!mapLoader) {
      this.mapLoader = new MapLoader(["geometry", "textures"], () => {});
    } else {
      this.mapLoader = mapLoader;
    }
    this.loadManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadManager);

    this.config = Object.assign({}, MiniMapManager.defaultConfig, config);

    if (typeof this.config.elevationSource === "string") {
      this.config.elevationSource =
        sources.elevation[this.config.elevationSource];
    }
  }

  async getMap(mapConfig) {
    let { textureSource, tileSegments, textureZoom, center, radius } =
      this.computeMapConfig(mapConfig);

    let elevationZoom =
      textureZoom - Math.log2(this.config.elevationSource.size / tileSegments);
    if (elevationZoom > this.config.elevationSource.maxZoom) {
      throw new Exception(`${tileSegments}segments z${textureZoom},try less`);
    }

    const elevationManager = new ElevationManager(
      this.config.elevationSource,
      elevationZoom,
      textureZoom
    );

    const tilesInfos = Utils.computeTextureTiles(
      center,
      radius,
      textureZoom,
      elevationZoom
    );

    const tilesData = await elevationManager.getDataFromElevationTiles(
      tilesInfos
    );

    let elevations = {
      min: Utils.arrayMin(tilesData.map((t) => t.min)),
      max: Utils.arrayMax(tilesData.map((t) => t.max)),
    };

    let resolution = this.computeResolution(textureZoom, elevations.min);

    if (this.config.debug) {
      mapLog(center, tilesInfos, tilesData, elevations, resolution);
    }
    if (this.config.dryRun) {
      dryRunLog(tilesInfos);
      return;
    }

    tilesData.forEach((tile) => {
      tile.geom = new TileGeometry(tile, resolution);
      tile.geom.computeVertexNormals();
    });

    elevationManager.joinNormals(tilesData);

    let miniMap = new THREE.Object3D();
    miniMap.userData = this.computeUserData(resolution, tilesInfos, elevations);

    tilesData.forEach((tile) => {
      let texture = this.textureLoader.load(
        textureSource.url(...tile.aId, textureSource.token)
      );
      let material = new THREE.MeshBasicMaterial({
        map: texture,
        // emissive: 0x222222,
        // wireframe: true,
        // color: 0xbbbbbb,
      });

      let mesh = new THREE.Mesh(tile.geom, material);
      mesh.position.set(
        tile.aId[1] - tilesInfos.aIdOrigin[1],
        tilesInfos.aIdOrigin[2] - tile.aId[2],
        0
      );
      mesh.userData.id = tile.id;
      miniMap.add(mesh);
    });

    let basementMeshes = BasementBuilder.computeBasement(
      tilesData,
      tilesInfos.bbox,
      resolution
    );
    basementMeshes.forEach((m) => miniMap.add(m));

    this.loadManager.onLoad = () => {
      this.mapLoader.update("textures", true, miniMap);
    };

    this.loadManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      let pct = Math.ceil((100 * itemsLoaded) / itemsTotal);
      this.mapLoader.update("textures", pct);
    };
    this.mapLoader.update("geometry", true, miniMap);

    return miniMap;
  }

  computeMapConfig(mapConfig) {
    let config = Object.assign({}, MiniMapManager.mapDefaultConfig, mapConfig);
    let textureSource = config.textureSource;

    if (typeof textureSource === "string") {
      textureSource = sources.texture[textureSource];
    }
    if (typeof textureSource === "function") {
      textureSource = {
        url: textureSource,
        size: 256,
      };
    }

    config.textureSource = textureSource;
    return config;
  }

  computeResolution(textureZoom, minElevation) {
    // ex : - earth circumference
    //      40075016 meters * xyResolution (0.00000002 for zoom 0) => 1 unit
    //      - useful for computation of elevation data inside geometry
    //      512 meters * xyResolution (0.0008176 for zoom 15) => 0.4
    let xy =
      (this.config.tileUnits * Math.pow(2, textureZoom)) / 40075016.68557849;
    let z = xy * this.config.zScaleFactor;
    return {
      xy,
      z,
      zOffset: minElevation * z - this.config.basementHeight,
    };
  }

  computeUserData(resolution, tilesInfos, elevations) {
    return {
      resolution,
      origin: Utils.tile2coords(tilesInfos.aIdOrigin),
      bbox: {
        x:
          tilesInfos.aIdFinals[tilesInfos.aIdFinals.length - 1][1] -
          tilesInfos.aIdOrigin[1] +
          1,
        y:
          tilesInfos.aIdFinals[tilesInfos.aIdFinals.length - 1][2] -
          tilesInfos.aIdOrigin[2] +
          1,
        z:
          (elevations.max - elevations.min) * resolution.z +
          this.config.basementHeight,
      },
    };
  }
}

MiniMapManager.defaultConfig = {
  elevationSource: "terrarium",
  zScaleFactor: 1.6,
  tileUnits: 1.0,
  debug: false,
  dryRun: false,
  basementHeight: 0.05,
};

MiniMapManager.mapDefaultConfig = {
  textureSource: "osm",
  tileSegments: 32, // doit être une puissance de 2
  textureZoom: 15,
  center: [6.4751, 46.1024],
  radius: 1, // distance en km
};

export default MiniMapManager;
