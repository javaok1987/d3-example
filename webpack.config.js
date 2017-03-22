
module.exports = {
    entry: {
        'bundle-scatterplot': ['./script/scatterplot.js', './script/utils.js'],
        'bundle-linechart': ['./script/linechart.js', './script/utils.js'],
        'bundle-metro': ['./script/metro-stations.js']
    },
    output: {
        filename: './app/js/[name].js'
    },
    module: {
    }
};
