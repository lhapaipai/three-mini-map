import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Stats from "three/examples/jsm/libs/stats.module";
import InfiniteGridHelper from "./helpers/InfiniteGridHelper";

import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";

import * as THREE from "three";
import "./style.css";
import ThreeMapManager from "../../src/ThreeMapManager";

let mapConfig = {
  textureSource: "localSwiss25",
  textureZoom: 15,
  center: [7.2545, 45.9314],
  distanceFromCenter: 15, //max 20 with local tiles
};
const debug = true;
const dryRun = false;
const raycastPath = false;

class App {
  constructor(selector) {
    THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
    let canvas = document.querySelector(selector);
    this.renderer = new THREE.WebGLRenderer({ canvas });

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.width = canvas.clientWidth * pixelRatio;
    this.height = canvas.clientHeight * pixelRatio;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("white");

    this.renderRequested = false;

    this.initLights();
    this.initCamera();
    this.initListeners();

    this.initScene();

    this.initHelpers();
    this.updateSize();
  }

  async initScene() {
    const threeGeo = new ThreeMapManager({
      debug,
      dryRun,
    });

    threeGeo.addEventListener("dispose", () => {
      let { x, y, z } = this.map.userData.mapBox;
      this.mapControls.target.set(x / 2, -y / 2, 0);
      this.camera.position.set(x * 0.25, -y, z * 1.5);
      this.requestRender();

      if (raycastPath) {
        this.initCombinsPathDev();
      } else {
        this.initCombinsPathProd();
      }
    });
    this.map = await threeGeo.getMap(mapConfig);
    this.scene.add(this.map);
  }

  async initCombinsPathProd() {
    let mapInfos = this.map.userData;
    console.log(`map userData`, mapInfos);
    let res = await fetch("/path/tour-des-combins-three.json");
    let randoGeojson = await res.json();

    const positions = randoGeojson.data;
    const material = new LineMaterial({
      color: 0xff0052,
      linewidth: 0.005,
    });

    let geometry = new LineGeometry();
    geometry.setPositions(positions);
    const line = new Line2(geometry, material);
    line.computeLineDistances();

    this.scene.add(line);
    this.requestRender();
  }

  async initCombinsPathDev() {
    let mapInfos = this.map.userData;
    console.log(`map userData`, mapInfos);
    let res = await fetch("/path/tour-des-combins-3857.json");
    let randoGeojson = await res.json();
    let coordinates = randoGeojson.features[0].geometry.coordinates;
    console.log(`rando geojson coordinates`, coordinates);

    const positions = [];
    let direction = new THREE.Vector3(0, 0, -1);
    let raycaster = new THREE.Raycaster();
    coordinates.forEach(([x, y, z]) => {
      let point = new THREE.Vector3(
        (x - mapInfos.origin[0]) * mapInfos.resolution,
        (y - mapInfos.origin[1]) * mapInfos.resolution,
        10
      );
      positions.push(point.x, point.y);
      raycaster.set(point, direction);
      const intersects = raycaster.intersectObjects(this.map.children, false);
      if (intersects.length === 1) {
        positions.push(intersects[0].point.z);
      } else {
        positions.push(
          z * mapInfos.zResolution - mapInfos.mapBox.offsetZ + 0.05
        );
      }
    });
    const material = new LineMaterial({
      color: 0xff0052,
      linewidth: 0.005,
    });

    let geometry = new LineGeometry();
    geometry.setPositions(positions);
    const line = new Line2(geometry, material);
    line.computeLineDistances();

    this.scene.add(line);
    this.requestRender();

    console.log(
      positions.map((p) => Math.floor(p * 100000) / 100000).toString()
    );
  }

  initListeners() {
    this.updateSize = this.updateSize.bind(this);
    this.requestRender = this.requestRender.bind(this);
    this.render = this.render.bind(this);

    window.addEventListener("resize", this.updateSize);
    this.mapControls.addEventListener("change", this.requestRender);
  }

  initCamera() {
    let canvas = this.renderer.domElement;
    let ratio = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, ratio, 0.01, 100);
    // this.camera.position.set(0, 0, 5);
    // this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    this.mapControls = new MapControls(this.camera, this.renderer.domElement);
    this.mapControls.maxPolarAngle = Math.PI * 0.45;
    this.mapControls.enableDamping = true;
  }

  initHelpers() {
    // this.gui = new GUI();
    if (debug) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);

      this.scene.add(new THREE.AxesHelper(5));

      // const grid = new InfiniteGridHelper(1, 5, new THREE.Color(0xaaaaaa));
      // this.scene.add(grid);
    }
  }

  initLights() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  updateSize() {
    let canvas = this.renderer.domElement;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.width = canvas.clientWidth * pixelRatio;
    this.height = canvas.clientHeight * pixelRatio;
    if (canvas.width !== this.width || canvas.height !== this.height) {
      this.renderer.setSize(this.width, this.height, false);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    }
    this.render();
  }

  render() {
    if (debug) {
      console.log("render");
      this.stats.update();
    }
    this.renderRequested = false;
    this.mapControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  requestRender() {
    if (!this.renderRequested) {
      this.renderRequested = true;
      requestAnimationFrame(this.render);
    }
  }
}

let app = new App("#app");
