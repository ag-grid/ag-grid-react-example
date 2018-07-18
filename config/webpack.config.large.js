const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src-large-data');

module.exports = {
    mode: 'production',
    entry: SRC_DIR + "/index.js",
    output: {
        path: path.resolve(__dirname, '../'),
        filename: "dist/react-large.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.js$|\.jsx$/,
                include: SRC_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    resolve: {
        alias: {
            "ag-grid": path.resolve('./node_modules/ag-grid'),
            "ag-grid-enterprise": path.resolve('./node_modules/ag-grid-enterprise'),
            react: path.resolve('./node_modules/react')
        },
        extensions: ['.js', '.jsx']
    },
    performance: {
        hints: false
    },
    devServer: {
        port: 8080,
    }
};