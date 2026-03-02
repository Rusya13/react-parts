const path = require('path');

module.exports = {
    module: {
        rules: [{
            test: /\.md$/,
            loader: "raw-loader"
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
};