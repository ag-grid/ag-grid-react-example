const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src-trader-dashboard');

module.exports = {
    mode: 'production',
    entry: SRC_DIR + "/index.js",
    output: {
        path: path.resolve(__dirname, '../'),
        filename: "dist/react-trader.js"
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
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: [
                        require('@babel/plugin-proposal-function-bind'),
                        require('@babel/plugin-proposal-class-properties')
                    ]
                }
            }
        ]
    },
    resolve: {
        alias: {
            "@ag-community/grid-core": path.resolve('./node_modules/@ag-community/grid-core'),
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
