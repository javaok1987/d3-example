
module.exports = {
    entry: {
        'bundle-scatterplot': ['./script/scatterplot.js', './script/utils.js'],
        'bundle-linechart': ['./script/linechart.js', './script/utils.js']
    },
    output: {
        filename: './app/js/[name].js'
    },
    module: {
    }
};
