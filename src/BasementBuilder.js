import * as THREE from "three";

export default class BasementBuilder {
  static computeBasement(
    textureTilesFullfilled,
    bboxTiles,
    zResolution,
    zOffset
  ) {
    let basementObjs = [];
    let ySize = bboxTiles.south - bboxTiles.north + 1;
    let xSize = bboxTiles.east - bboxTiles.west + 1;
    let material = new THREE.MeshLambertMaterial({
      emissive: 0x999999,
    });

    ["north", "south"].forEach((orientation) => {
      let y = orientation === "north" ? 0 : -ySize;
      let yNormal = orientation === "north" ? 1 : -1;
      let positions = [];
      let normals = [];
      let indexes = [];
      textureTilesFullfilled
        .filter((t) => t.aId[2] === bboxTiles[orientation])
        .sort((a, b) => a.aId[1] > b.aId[1])
        .forEach((t, tileNum, tiles) => {
          let idx;

          t[orientation].forEach((ele, num, arr) => {
            let x = tileNum + num / arr.length;
            idx = positions.length / 3;
            positions.push(x, y, ele * zResolution - zOffset);
            positions.push(x, y, 0);
            normals.push(0, yNormal, 0, 0, yNormal, 0);
            if (tileNum === 0 && num === 0) {
              indexes.push(idx, idx + 1);
            } else {
              indexes.push(idx, idx, idx - 1, idx + 1, idx, idx + 1);
            }
          });

          if (tileNum === tiles.length - 1) {
            idx = positions.length / 3;

            positions.push(
              tileNum + 1,
              y,
              (orientation === "north" ? t.east[0] : t.se) * zResolution -
                zOffset
            );
            positions.push(tileNum + 1, y, 0);
            normals.push(0, yNormal, 0, 0, yNormal, 0);

            indexes.push(idx, idx, idx - 1, idx + 1);
          }
        });
      if (orientation === "north") indexes.reverse();

      let geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(positions), 3)
      );
      geom.setAttribute(
        "normal",
        new THREE.BufferAttribute(new Float32Array(normals), 3)
      );
      geom.setIndex(indexes);
      console.log(positions, "indexes", indexes, geom.attributes.normal.array);
      let mesh = new THREE.Mesh(geom, material);
      basementObjs.push(mesh);
    });
    ["west", "east"].forEach((orientation) => {
      let x = orientation === "west" ? 0 : xSize;
      let xNormal = orientation === "west" ? -1 : 1;
      let positions = [];
      let normals = [];
      let indexes = [];
      textureTilesFullfilled
        .filter((t) => t.aId[1] === bboxTiles[orientation])
        .sort((a, b) => a.aId[2] > b.aId[2])
        .forEach((t, tileNum, tiles) => {
          let idx;

          t[orientation].forEach((ele, num, arr) => {
            let y = -tileNum - num / arr.length;
            idx = positions.length / 3;
            positions.push(x, y, ele * zResolution - zOffset);
            positions.push(x, y, 0);
            normals.push(xNormal, 0, 0, xNormal, 0, 0);
            if (tileNum === 0 && num === 0) {
              indexes.push(idx, idx + 1);
            } else {
              indexes.push(idx, idx, idx - 1, idx + 1, idx, idx + 1);
            }
          });

          if (tileNum === tiles.length - 1) {
            idx = positions.length / 3;

            positions.push(
              x,
              -tileNum - 1,
              (orientation === "west" ? t.south[0] : t.se) * zResolution -
                zOffset
            );
            positions.push(x, -tileNum - 1, 0);
            normals.push(xNormal, 0, 0, xNormal, 0, 0);

            indexes.push(idx, idx, idx - 1, idx + 1);
          }
        });
      if (orientation === "east") indexes.reverse();

      // console.log(positions, "indexes", indexes);
      let geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(positions), 3)
      );
      geom.setAttribute(
        "normal",
        new THREE.BufferAttribute(new Float32Array(normals), 3)
      );

      geom.setIndex(indexes);
      let mesh = new THREE.Mesh(geom, material);
      basementObjs.push(mesh);
    });

    {
      let geom = new THREE.PlaneBufferGeometry(xSize, ySize, 1, 1);
      let mesh = new THREE.Mesh(geom, material);
      mesh.position.set(xSize / 2, -ySize / 2, 0);
      mesh.rotation.x = Math.PI;
      basementObjs.push(mesh);
      console.log("face", geom);
    }
    return basementObjs;
  }
}
