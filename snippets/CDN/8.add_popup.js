/**
 * Step 5: Add a popup.
 * This sample demonstrates how to configure a popupTemplate for
 * the CSVLayer.
 * also adds a BasemapGallery widget in an Expand widget.
 */

require([
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/CSVLayer',
  'esri/widgets/Legend',
  'esri/layers/support/LabelClass',
  'esri/renderers/SimpleRenderer',
  'esri/widgets/BasemapGallery',
  'esri/widgets/Expand',
], function (Map, MapView, CSVLayer, Legend, LabelClass, SimpleRenderer) {
  // initialize the popupTemplate
  // this autocasts as new PopupTemplate()

  const popupTemplate = {
    title: '{name}',
    content: [
      {
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'type',
            label: 'Type',
          },
          {
            fieldName: 'province',
            label: 'Province',
          },
          {
            fieldName: 'rating',
            label: 'Popularity',
          },
        ],
      },
    ],
  }

  const simpleRenderer = new SimpleRenderer({
    symbol: {
      type: 'picture-marker',
      url: 'http://127.0.0.1:5500/asset/img/popularity.png',
      width: '64px',
      height: '64px',
    },
    visualVariables: [
      {
        type: 'size',
        field: 'rating',
        stops: [
          { value: 5, size: 40, label: 'International' },
          { value: 4, size: 30, label: 'Regional' },
          { value: 3, size: 20, label: 'Local' },
        ],
        legendOptions: {
          title: 'Landmark Popularity',
        },
      },
    ],
  })

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

  const csvLayer = new CSVLayer({
    url: 'http://127.0.0.1:5500/data/indonesia_landmarks_100.csv',
    title: 'Indonesia Landmarks',
    labelingInfo: [labelClass],
    renderer: simpleRenderer,
    popupTemplate: popupTemplate,
  })

  const map = new Map({
    basemap: 'dark-gray-vector',
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
