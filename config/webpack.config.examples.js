const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src-examples');

module.exports = {
    mode: 'development',
    entry: SRC_DIR + "/index.js",
    output: {
        path: path.resolve(__dirname, '../'),
        filename: "dist/react-examples.js"
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.js$|\.jsx$/,
                include: SRC_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: [
                        require('@babel/plugin-proposal-function-bind'),
                        require('@babel/plugin-proposal-class-properties')
                    ]
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=[path]/[name].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            // "@ag-grid-community/core/modules": path.resolve('./node_modules/@ag-grid-community/core/dist/es2015/modules'),
            "@ag-grid-community/core": path.resolve('./node_modules/@ag-grid-community/core'),
            // "ag-grid-enterprise": path.resolve('./node_modules/ag-grid-enterprise'),
            react: path.resolve('./node_modules/react')
        },
        extensions: ['*.mjs', '.js', '.jsx']
    },
    performance: {
        hints: false
    },
    devtool: 'inline-source-map',
    devServer: {
        public: 'http://localhost:8080',
        port: 8080,
        historyApiFallback: true
    }
};
