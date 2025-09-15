/**
 * Step 3: Adding a labels to the layer
 * This sample demonstrates how to add labels to the CSVLayer
 * using the LabelClass
 */
require([
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/CSVLayer',
  'esri/widgets/Legend',
  'esri/layers/support/LabelClass',
], function (Map, MapView, CSVLayer, Legend, LabelClass) {
  // create a label class
  const labelClass = new LabelClass({
    labelExpressionInfo: { expression: '$feature.name' },
    symbol: {
      type: 'text', // autocasts as new TextSymbol()
      color: '#00A0FF',
      font: {
        // autocast as new Font()
        family: 'Arial',
        size: 10,
        weight: 'bold',
      },
    },
    labelPlacement: 'above-center',
  })

  // create an instance of a CSVLayer
  // pass in the url to the data
  const csvLayer = new CSVLayer({
    url: 'http://127.0.0.1:5500/data/indonesia_landmarks_100.csv',
    title: 'Indonesia Landmarks',
    labelingInfo: [labelClass],
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
