export default {
  elevation: {
    terrarium: {
      url: (z, x, y) =>
        `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`,
      size: 256,
      maxZoom: 15,
    },
    mapboxElevation: {
      url: (z, x, y, token) =>
        `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}@2x.pngraw?access_token=${token}`,
      token: process.env.TOKEN_MAPBOX,
      size: 512,
      maxZoom: 15,
    },
    localElevation: {
      url: (z, x, y) => `http://map-tiles.local/terrarium/${z}/${x}/${y}.png`,
      size: 256,
      maxZoom: 15,
    },
    mapboxTerrainVector: {
      url: (z, x, y, token) =>
        `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/${z}/${x}/${y}.vector.pbf?access_token=${token}`,
      token: process.env.TOKEN_MAPBOX,
    },
  },
  texture: {
    localOSM: (z, x, y) => `http://map-tiles.local/osm/${z}/${x}/${y}.png`,
    localIgn25: (z, x, y) => `http://map-tiles.local/ign-25/${z}/${x}/${y}.jpg`,
    localIgnSatellite: (z, x, y) =>
      `http://map-tiles.local/ign-satellite/${z}/${x}/${y}.jpg`,
    localSwiss25: (z, x, y) =>
      `http://map-tiles.local/swiss-25/${z}/${x}/${y}.jpeg`,
    localGoogleSatellite: (z, x, y) =>
      `http://map-tiles.local/google-satellite/${z}/${x}/${y}.jpg`,

    osm: (z, x, y) => `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`,
    googleSatellite: (z, x, y) =>
      `https://mt3.google.com/vt/lyrs=s&hl=fr&x=${x}&y=${y}&z=${z}&s=Ga`,

    ign25: {
      url: (z, x, y, token) =>
        `https://wxs.ign.fr/${token}/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${z}&TileCol=${x}&TileRow=${y}`,
      size: 256,
      token: process.env.TOKEN_IGN,
    },
    ignSatellite: {
      url: (z, x, y, token) =>
        `https://wxs.ign.fr/${token}/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=${z}&TileCol=${x}&TileRow=${y}`,
      size: 256,
      token: process.env.TOKEN_IGN,
    },

    swiss25: (z, x, y) =>
      `https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/${z}/${x}/${y}.jpeg`,
    swissSatellite: (z, x, y) =>
      `https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${z}/${x}/${y}.jpeg`,

    mapboxSatellite: {
      url: (z, x, y, token) =>
        `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${z}/${x}/${y}?access_token=${token}`,
      token: process.env.TOKEN_MAPBOX,
      // TODO vérifier
      size: 256,
    },
  },
};
