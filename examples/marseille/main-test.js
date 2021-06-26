console.log("hello world");
import ThreeMapManager from "../../src/ThreeMapManager";
const { THREE } = window;

const threeGeo = new ThreeMapManager({
  debug: true,
  dryRun: false,
  zScaleFactor: 2,
});

threeGeo.addEventListener("dispose", () => {
  let { x, y, z } = this.map.userData.mapBox;
  this.mapControls.target.set(x / 2, -y / 2, 0);
  this.camera.position.set(x * 0.25, -y, z * 1.5);
  this.requestRender();
});
threeGeo.getMap({
  textureSourceName: "localIgnSatellite",
  textureZoom: 15,
  center: [5.354811, 43.346674],
  distanceFromCenter: 2, //20,
});

let canvas = document.querySelector("#app");
let renderer = new THREE.WebGLRenderer({ canvas });
