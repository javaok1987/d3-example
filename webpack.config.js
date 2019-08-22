module.exports = {
  entry: {
    'bundle-scatterplot': ['./script/scatterplot.js', './script/random.js'],
    'bundle-scatterplot2': ['./script/scatterplot2.js', './script/random.js'],
    'bundle-linechart': ['./script/linechart.js'],
    'bundle-barchart': ['./script/d3-tip.js', './script/barchart.js'],
    'bundle-metro': ['./script/metro-stations.js'],
  },
  output: {
    filename: './app/js/[name].js',
  },
  module: {},
}
