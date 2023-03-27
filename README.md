# Three-Mini-Map

Library to display maps using `three.js`.

- Generate 3d geometry from elevation tiles.
- Smooth connexion between tiles.
- Choose a map provider who deliver (EPSG:3857) WMTS tiles and add textures to tiles.

[**Basic example : Marignier**](https://three-mini-map.netlify.app/default/)

[**Example Combins tour (switzerland)**](https://three-mini-map.netlify.app/private-combins/)

[**Example Grande casse (France)**](https://three-mini-map.netlify.app/private-casse/)

<img alt="Three Mini Map" src="https://user-images.githubusercontent.com/1088155/123599215-a92a1980-d7f5-11eb-8b0f-dae04e0eb61f.png">

<img alt="Combins" src="https://user-images.githubusercontent.com/1088155/124091028-b34a5300-da55-11eb-894a-b1fb9e4effca.jpg" width="400"><img alt="Combins debug" src="https://user-images.githubusercontent.com/1088155/124091077-bf361500-da55-11eb-86f9-bff74b6a7fa6.jpg" width="400">



<img alt="Môle" src="https://user-images.githubusercontent.com/1088155/124091100-c4935f80-da55-11eb-9ac9-92c5462ca735.jpg" width="400"><img alt="Môle debug" src="https://user-images.githubusercontent.com/1088155/124091130-c9581380-da55-11eb-9b22-28fafdfe089c.jpg" width="400">

## Installation

if you want to use this library in your three project.

```console
npm install three-mini-map
```

Examples are located in the `examples` folder. Each example has defined his own `package.json` but `npm install` is not needed. Just execute this command in the root directory. (examples share the same workspace )

If you want to test a Basic Hello World, check the `examples/default`

```console
git clone https://github.com/lhapaipai/three-mini-map.git
npm install
cd examples/default
npm run dev
```

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

| Key                 | Description                                                                                                                                                                           | Default Value     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| textureSource (str) | map provider used to texture the tile.                                                                                                                                                | `"osm"`           |
| textureSource (obj) | custom map provider                                                                                                                                                                   | -                 |
| tileSegments        | nb of segments used per texture tile to build the geometry. must be a power of 2 (16, 32, 64, 128, 256)                                                                               | 32                |
| textureZoom         | zoom used to retrieve textures                                                                                                                                                        | 15                |
| center              | array containing position of the map `[lng, lat]`                                                                                                                                     | [6.4751, 46.1024] |
| radius              | distance in kilometers used to compute the bbox of your map.                                                                                                                          | 1                 |
| material            | an object with the `name` and `options` to apply to each tile. set `map` to false if you don't want texture (or if you want to preview relief data before download big texture data.) |                   |
| withTexture         | wether or not we add map texture (from textureSource) to the material                                                                                                                 | true              |

if you want to provide your own map provider you can specify configuration in the textureSource key.

```javascript
miniMapManager.getMap({
  textureSource: {
    url: (z, x, y, token) =>
      `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${z}/${x}/${y}?access_token=${token}`,
    size: 256,
    token: "YOUR_TOKEN",
  },
  material: {
    name: "MeshLambertMaterial",
    options: {
      wireframe: false,
    },
  },
});
```

## Issues

I load two times the Three Library...

because all Three.js update are minor version change from major version 0. If you do not install the same version of three as three-mini-map in your project your app will load twice three.js

- Check the version of Three.js installed by `three-mini-map` and install the same in your project.
  or
- Import MiniMapManager from the sources

```js
import MiniMapManager from "three-mini-map/src/MiniMapManager";
```
