import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Stats from "three/examples/jsm/libs/stats.module";
import InfiniteGridHelper from "./InfiniteGridHelper";

import * as THREE from "three";
import "./style.css";
import MiniMapManager from "../../src/MiniMapManager";

let mapConfig = {
  textureSource: "osm", // localIgnSatellite
  textureZoom: 15,
  center: [6.4751, 46.1024],
  radius: 4,
  tileSegments: 4,
};
const debug = false;
const dryRun = false;

class App {
  constructor(selector) {
    THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
    let canvas = document.querySelector(selector);
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.clear(true, true, true);

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.width = canvas.clientWidth * pixelRatio;
    this.height = canvas.clientHeight * pixelRatio;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("white");

    this.renderRequested = false;
    this.init();
  }

  async init() {
    this.initLights();
    this.initListeners();
    this.initCamera();

    await this.initScene();
    this.initHelpers();
    this.updateSize();
  }

  async initScene() {
    const miniMapManager = new MiniMapManager({
      elevationSource: "localElevation",
      debug,
      dryRun,
    });

    miniMapManager.mapLoader.addEventListener("ready", () => {
      this.updateCameraToMap(this.map.userData);
    });
    this.map = await miniMapManager.getMap(mapConfig);
    if (this.map) {
      this.scene.add(this.map);
    }
  }

  initListeners() {
    this.updateSize = this.updateSize.bind(this);
    this.requestRender = this.requestRender.bind(this);
    this.render = this.render.bind(this);

    window.addEventListener("resize", this.updateSize);
  }

  initCamera() {
    let canvas = this.renderer.domElement;
    let ratio = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, ratio, 0.01, 100);

    this.scene.add(this.camera);

    this.mapControls = new MapControls(this.camera, this.renderer.domElement);
    this.mapControls.target.set(0, 0, 0);
    this.mapControls.maxPolarAngle = Math.PI * 0.45;
    this.mapControls.enableDamping = true;
    this.mapControls.addEventListener("change", this.requestRender);
  }

  updateCameraToMap(mapData) {
    let { x, y, z } = mapData.bbox;
    this.camera.position.set(x * 0.25, -y, z * 1.5);
    this.mapControls.target.set(x / 2, -y / 2, 0);
    this.requestRender();
  }

  initHelpers() {
    if (debug) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);

      this.scene.add(new THREE.AxesHelper(5));

      this.map.children.forEach((t) => {
        t.add(new THREE.AxesHelper(1));
      });
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

new App("#app");
