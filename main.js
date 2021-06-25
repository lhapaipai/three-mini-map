import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Stats from "three/examples/jsm/libs/stats.module";

import {
  AllMaterialPropertyGUIHelper,
  ColorGUIHelper,
  DegRadHelper,
  DimensionGUIHelper,
  makeXYZGUI,
  MinMaxGUIHelper,
} from "./helpers/guiHelpers";
import * as THREE from "three";
import "./style.css";
import ThreeGeo from "./src/ThreeGeo";

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
    // const mesh = new THREE.LineSegments(
    //   new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
    //   new THREE.LineBasicMaterial({ color: "red" })
    // );
    // this.scene.add(mesh);

    const threeGeo = new ThreeGeo({
      // apiTexture: "osm",
      // textureZoom: 11,
      // apiElevation: "terrarium",
      // tileSegments: 128, // doit être un diviseur de la taille de la tuile élévation
      // zScale: 0.05,
      // distanceFromCenter: 5,
      // center: [6.4751, 46.1024],
      onReady: this.requestRender,
    });
    let map = await threeGeo.getMap();
    this.scene.add(map);

    this.requestRender();
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
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    this.mapControls = new MapControls(this.camera, this.renderer.domElement);
    // this.mapControls.maxPolarAngle = Math.PI * 0.3;
    this.mapControls.enableDamping = true;
  }

  initHelpers() {
    // this.scene.add(new THREE.AxesHelper(1));
    // this.gui = new GUI();
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
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
    console.log("render");
    this.renderRequested = false;
    this.mapControls.update();
    this.stats.update();
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
