/**
 * Step 2: Adding a layer to the map.
 * This sample demonstrates how to add csv data with lat/long
 * coordinates to a map using a CSVLayer.
 * Note: CSV data must have columns for latitude and longitude coordinates.
 * This app also adds the legend widget.
 */
require([
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/CSVLayer',
  'esri/widgets/Legend',
], function (Map, MapView, CSVLayer, Legend) {
  // create an instance of a CSVLayer
  // pass in the url to the data
  const csvLayer = new CSVLayer({
    url: 'http://127.0.0.1:5500/data/indonesia_landmarks_100.csv',
    title: 'Indonesia Landmarks',
  })

  const map = new Map({
    basemap: 'gray-vector',
    layers: [csvLayer],
  })

  const view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [118.0, -2.55],
    zoom: 5,
  })

  const legend = new Legend({
    view: view,
  })

  view.ui.add(legend, 'bottom-left')
})
