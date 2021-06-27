import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Stats from "three/examples/jsm/libs/stats.module";
import InfiniteGridHelper from "./InfiniteGridHelper";

import * as THREE from "three";
import "./style.css";
import ThreeMapManager from "../../src/ThreeMapManager";

let mapConfig = {
  textureSource: "localIgn25", // localIgnSatellite
  textureZoom: 15,
  center: [6.4751, 46.1024],
  distanceFromCenter: 4,
};
const debug = true;
const dryRun = false;

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
    });
    this.map = await threeGeo.getMap(mapConfig);
    if (this.map) {
      this.scene.add(this.map);
    }
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
    this.scene.add(this.camera);

    this.mapControls = new MapControls(this.camera, this.renderer.domElement);
    // this.mapControls.maxPolarAngle = Math.PI * 0.45;
    this.mapControls.enableDamping = true;
  }

  initHelpers() {
    // this.gui = new GUI();
    if (debug) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);

      this.scene.add(new THREE.AxesHelper(5));
      const grid = new InfiniteGridHelper(1, 5, new THREE.Color(0xaaaaaa));

      this.scene.add(grid);
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
