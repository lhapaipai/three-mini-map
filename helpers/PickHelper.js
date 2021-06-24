import { Raycaster } from "three";

export default class PickHelper {
  constructor() {
    this.raycaster = new Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }

  pick(normalizedPosition, scene, camera, time) {
    if (this.pickedObject) {
      this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject = undefined;
    }

    this.raycaster.setFromCamera(normalizedPosition, camera);
  }
}
