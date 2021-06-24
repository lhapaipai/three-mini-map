export default config = {
  urls: {
    terrarium: {
      url: (z, x, y) =>
        `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`,
      epsg: "3857",
      size: [256, 256],
      maxZoom: 15,
    },
    mapboxElevation: {
      url: (z, x, y) =>
        `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}@2x.pngraw?access_token=${token}`,
      token:
        "pk.eyJ1IjoibGhhcGFpcGFpIiwiYSI6IkdfVFF6NTgifQ.oqzkNQOTByLWb9Q0EgNr3A",
      epsg: "3857",
      size: [512, 512],
      maxZoom: 15,
    },
    localElevation: {
      url: (z, x, y) => `/tiles/elevation/${z}/${x}/${y}.png`,
      epsg: "3857",
      size: [256, 256],
      maxZoom: 15,
    },
    mapboxSatellite: {
      url: (z, x, y) =>
        `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${z}/${x}/${y}?access_token=${token}`,
    },
    mapboxTerrainVector: {
      url: (z, x, y) =>
        `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/${z}/${x}/${y}.vector.pbf?access_token=${token}`,
    },
    osm: {
      url: (z, x, y) => `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`,
      size: [256, 256],
    },
  },
};
