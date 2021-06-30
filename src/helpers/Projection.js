import * as THREE from "three";

export default class Projection {
  constructor(resolution, origin) {
    this.resolution = resolution;
    this.origin = origin;
  }

  /*
  given an array of EPSG:3857 coords with alt in meters
  [[x1,y1,z1], [x2,y2,z2], ...]
  [[802722,5772170.9,1698.1],[802724,5772186.4,1698.5],...]

  return an array of coords in Three coordinates.
  [1.2,0.6,.4, 1.3,.63,.5, ...]
  */

  project(coordinates, zOffset = 0) {
    const positions = [];
    coordinates.forEach(([x, y, z]) => {
      positions.push(
        (x - this.origin[0]) * this.resolution.xy,
        (y - this.origin[1]) * this.resolution.xy,
        z * this.resolution.z - this.resolution.zOffset + zOffset
      );
    });
    return positions;
  }

  projectWithRaycast(coordinates, mapChildren, zOffset = 0) {
    const positions = [];
    let direction = new THREE.Vector3(0, 0, -1);
    let raycaster = new THREE.Raycaster();
    coordinates.forEach(([x, y, z]) => {
      let point = new THREE.Vector3(
        (x - this.origin[0]) * this.resolution.xy,
        (y - this.origin[1]) * this.resolution.xy,
        10
      );
      positions.push(point.x, point.y);
      raycaster.set(point, direction);
      const intersects = raycaster.intersectObjects(mapChildren, false);
      if (intersects.length === 1) {
        positions.push(intersects[0].point.z);
      } else {
        positions.push(
          z * this.resolution.z - this.resolution.zOffset + zOffset
        );
      }
    });
    return positions;
  }

  getAltitude(coordinates, mapChildren, zOffset = 0) {
    let direction = new THREE.Vector3(0, 0, -1);
    let raycaster = new THREE.Raycaster();
    coordinates.forEach(([x, y, z], idx) => {
      let point = new THREE.Vector3(
        (x - this.origin[0]) * this.resolution.xy,
        (y - this.origin[1]) * this.resolution.xy,
        10
      );
      raycaster.set(point, direction);
      const intersects = raycaster.intersectObjects(mapChildren, false);
      if (intersects.length === 1) {
        coordinates[idx][2] =
          (intersects[0].point.z + this.resolution.zOffset) / this.resolution.z;
        // positions.push(intersects[0].point.z);
      } else {
        coordinates[idx][2] = "NaN";
        // positions.push(
        //   z * this.resolution.z - this.resolution.zOffset + zOffset
        // );
      }
    });
    return coordinates;
  }
}
