# Three-Mini-Map

Library to display maps using `three.js`.

- Generate 3d geometry from elevation tiles.
- Smooth connexion between tiles.
- Choose a map provider who deliver (EPSG:3857) WMTS tiles and add textures to tiles.

<img alt="Three Mini Map" src="https://user-images.githubusercontent.com/1088155/123599215-a92a1980-d7f5-11eb-8b0f-dae04e0eb61f.png">

[**Live demo**](https://three-mini-map.netlify.app/default/)

## Installation

if you want to use this library in your three project.

```console
npm install three-mini-map
```

if you want to test the library with his examples

```console
git clone https://github.com/lhapaipai/three-mini-map.git
npm install
```

Examples are located in the `examples` folder. Each example has defined his own `package.json` but `npm install` is not needed. Just execute this command in the root directory. (examples share the same workspace )

## Usage

```js
import MiniMapManager from "mini-map-manager";

const miniMapManager = new MiniMapManager();

miniMapManager
  .getMap({
    textureSource: "osm",
    textureZoom: 15,
    center: [6.4751, 46.1024],
    radius: 4,
  })
  .then((map) => {
    let scene = new THREE.Scene();
    scene.add(map);
  });
```

## API

### `MiniMapManager` class

```javascript
const miniMapManager = new MiniMapManager(options);
```

Define custom configuration in the `options` object.

| Key                      | Description                                                           | Default Value |
| ------------------------ | --------------------------------------------------------------------- | ------------- |
| elevationSource (string) | map elevation provider.                                               | `"terrarium"` |
| elevationSource (obj)    | custom elevation provider                                             | -             |
| zScaleFactor             | your elevation data is multiplied to this factor                      | 1.6           |
| tileUnits                | the dimension of each tile in Three                                   | 1.0           |
| debug                    | show debug infos in your console.                                     | false         |
| dryRun                   | show tiles to load if you want to download them and then work locally | false         |
| basementHeight           | height of the base (in three coords) on which to place the map        | 0.05          |

if you want to provide your own elevation provider you can specify configuration in the elevationSource key.

```javascript
new MiniMapManager({
  elevationSource: {
    url: (z, x, y) =>
      `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`,
    size: 256,
    maxZoom: 15,
  },
});
```

### `miniMapManager` instance methods

```javascript
miniMapManager.getMap(mapOptions).then((map) => {
  // map is a THREE.Group instance
});
```

Define custom configuration in the `mapOptions` object.

| Key                 | Description                                                                                             | Default Value     |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ----------------- |
| textureSource (str) | map provider used to texture the tile.                                                                  | `"osm"`           |
| textureSource (obj) | custom map provider                                                                                     | -                 |
| tileSegments        | nb of segments used per texture tile to build the geometry. must be a power of 2 (16, 32, 64, 128, 256) | 32                |
| textureZoom         | zoom used to retrieve textures                                                                          | 15                |
| center              | array containing position of the map `[lng, lat]`                                                       | [6.4751, 46.1024] |
| radius              | distance in kilometers used to compute the bbox of your map.                                            | 1                 |

if you want to provide your own map provider you can specify configuration in the textureSource key.

```javascript
miniMapManager.getMap({
  textureSource: {
    url: (z, x, y, token) =>
      `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${z}/${x}/${y}?access_token=${token}`,
    size: 256,
    token: "YOUR_TOKEN",
  },
});
```
