var webpack = require('webpack');

module.exports = {
    output: {
        path: __dirname,
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
