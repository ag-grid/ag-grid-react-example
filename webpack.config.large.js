const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src-large');

module.exports = {
    entry: SRC_DIR + "/index.js",
    output: {
        path: __dirname,
        filename: "dist/react-large.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
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
        extensions: ['', '.js', '.jsx']
    }
};