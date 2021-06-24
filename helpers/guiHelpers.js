import { MathUtils } from "three";

export class DegRadHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return MathUtils.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = MathUtils.degToRad(v);
  }
}
export class StringToNumberHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return this.obj[this.prop];
  }
  set value(v) {
    this.obj[this.prop] = parseFloat(v);
  }
}
export class ColorGUIHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return `#${this.obj[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.obj[this.prop].set(hexString);
  }
}
export function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
  folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
  folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
  folder.open();
}
export class DimensionGUIHelper {
  constructor(obj, minProp, maxProp) {
    this.obj = obj;
    this.minProp = minProp;
    this.maxProp = maxProp;
  }
  get value() {
    return this.obj[this.maxProp] * 2;
  }
  set value(v) {
    this.obj[this.maxProp] = v/2;
    this.obj[this.minProp] = -v/2;
  }
}
export class MinMaxGUIHelper {
  constructor(obj, minProp, maxProp, minDif) {
    this.obj = obj;
    this.minProp = minProp;
    this.maxProp = maxProp;
    this.minDif = minDif;
  }
  get min() {
    return this.obj[this.minProp];
  }
  get max() {
    return this.obj[this.maxProp];
  }
  set min(v) {
    this.obj[this.minProp] = v;
    this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
  }
  set max(v) {
    this.obj[this.maxProp] = v;
    this.min = this.min;
  }
}
export class AllMaterialPropertyGUIHelper {
  constructor(prop, scene) {
    this.prop = prop;
    this.scene = scene;
  }
  get value() {
    const {scene, prop} = this;
    let v;
    scene.traverse(obj => {
      if (obj.material && obj.material[prop] !== undefined) {
        v = obj.material[prop];
      }
    });
    return v;
  }
  set value(v) {
    const {scene, prop} = this;
    scene.traverse(obj => {
      if (obj.material && obj.material[prop] !== undefined) {
        obj.material[prop] = v;
        obj.material.needsUpdate = true;
      }
    });
  }
}