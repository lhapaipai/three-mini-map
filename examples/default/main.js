import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

import * as THREE from "three";
import "./style.css";
import MiniMapManager from "../../src/MiniMapManager";
import { mapLog } from "../../src/helpers/log";

let mapConfig = {
  textureSource: "osm",
  textureZoom: 13,
  center: [6.4751, 46.1024],
  radius: 8,
  tileSegments: 32,
  withTexture: true,
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

    this.updateSize = this.updateSize.bind(this);
    this.requestRender = this.requestRender.bind(this);
    this.render = this.render.bind(this);

    this.init();
  }

  async init() {
    this.initLights();
    this.initCamera();

    window.addEventListener("resize", this.updateSize);
    this.updateSize();

    await this.initScene();
    this.initHelpers();
  }

  initLights() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  initCamera() {
    let canvas = this.renderer.domElement;
    let ratio = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(60, ratio, 0.01, 100);
    this.camera.position.set(5, -7, 2);
    this.scene.add(this.camera);

    this.mapControls = new MapControls(this.camera, this.renderer.domElement);
    this.mapControls.target.set(2, -2, 0);
    this.mapControls.maxPolarAngle = Math.PI * 0.45;
    this.mapControls.enableDamping = true;
    this.mapControls.addEventListener("change", this.requestRender);
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

  async initScene() {
    const miniMapManager = new MiniMapManager({
      debug,
      dryRun,
    });

    miniMapManager.mapLoader.addEventListener("ready", this.requestRender);
    this.map = await miniMapManager.getMap(mapConfig);

    this.scene.add(this.map);
    if (debug) {
      mapLog(this.map.userData, dryRun);
    }
  }

  initHelpers() {
    if (debug) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);

      this.scene.add(new THREE.AxesHelper(5));

      this.map.children.forEach((t) => {
        if (t.geometry.type === "TileGeometry") {
          this.scene.add(new THREE.BoxHelper(t, 0x770d9e));
        }
      });
    }
  }

  render() {
    if (debug) {
      console.log("render");
      this.stats && this.stats.update();
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
