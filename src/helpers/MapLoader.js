let translations = {
  geometry: "Relief",
  textures: "Textures",
  path: "Itinéraire",
};
import * as THREE from "three";

export default class MapLoader extends THREE.EventDispatcher {
  constructor(elementsName, onReady, domParent) {
    super();
    this.elements = {};
    this.onReady = onReady;

    let container = document.createElement("div");
    // container.style.cssText = "";
    container.classList.add("loader", "visible");

    let dialog = document.createElement("div");
    dialog.classList.add("dialog");

    this.statusTextures = document.createElement("span");

    elementsName.forEach((elementName) => {
      let row = document.createElement("div");
      let $elt = document.createElement("span");

      $elt.classList.add("status");
      $elt.innerText = "";
      row.appendChild($elt);
      row.appendChild(document.createTextNode(translations[elementName]));
      dialog.append(row);

      this.elements[elementName] = {
        dom: $elt,
        value: false,
      };
    });

    container.append(dialog);
    this.dom = container;
    if (domParent) {
      domParent.append(container);
    } else {
      document.body.append(container);
    }
  }
  update(elementName, status, context) {
    let elt = this.elements[elementName];
    if (!elt) return;

    elt.value = status;
    elt.dom.innerText = status;

    if (status === true) {
      this.dispatchEvent({
        type: `ready:${elementName}`,
        context,
      });

      this.testReady(context);
    }
  }

  testReady() {
    let ready = true;
    for (let elt in this.elements) {
      ready = ready && this.elements[elt].value === true;
    }
    if (!ready) return;
    this.dom.classList.remove("visible");

    this.dispatchEvent({
      type: `ready`,
    });
    this.onReady();
  }
}
