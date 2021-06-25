export default {
  terrarium: {
    url: (z, x, y) =>
      `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  mapboxElevation: {
    url: (z, x, y, token) =>
      `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}@2x.pngraw?access_token=${token}`,
    token: process.env.TOKEN_MAPBOX,
    epsg: "3857",
    size: [512, 512],
    maxZoom: 15,
  },
  localElevation: {
    url: (z, x, y) => `/tiles/terrarium/${z}/${x}/${y}.png`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  localOSM: {
    url: (z, x, y) => `/tiles/osm/${z}/${x}/${y}.png`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  mapboxSatellite: {
    url: (z, x, y, token) =>
      `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${z}/${x}/${y}?access_token=${token}`,
    token: process.env.TOKEN_MAPBOX,
  },
  mapboxTerrainVector: {
    url: (z, x, y, token) =>
      `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/${z}/${x}/${y}.vector.pbf?access_token=${token}`,
    token: process.env.TOKEN_MAPBOX,
  },
  ign25: {
    url: (z, x, y, token) =>
      `https://wxs.ign.fr/${token}/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${z}&TileCol=${x}&TileRow=${y}`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
    token: process.env.TOKEN_IGN,
  },
  localIgn25: {
    url: (z, x, y) => `/tiles/ign-25/${z}/${x}/${y}.jpg`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  localIgnSatellite: {
    url: (z, x, y) => `/tiles/ign-satellite/${z}/${x}/${y}.jpg`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  ignSatellite: {
    url: (z, x, y, token) =>
      `https://wxs.ign.fr/${token}/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${z}&TileCol=${x}&TileRow=${y}`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
    token: process.env.TOKEN_IGN,
  },
  localSwiss25: {
    url: (z, x, y, token) => `/tiles/swiss-25/${z}/${x}/${y}.jpeg`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  swiss25: {
    url: (z, x, y, token) =>
      `https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/${z}/${x}/${y}.jpeg`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  swissSatellite: {
    url: (z, x, y, token) =>
      `https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${z}/${x}/${y}.jpeg`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
  osm: {
    url: (z, x, y) => `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`,
    epsg: "3857",
    size: [256, 256],
    maxZoom: 15,
  },
};
