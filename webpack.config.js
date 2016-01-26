module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    resolve: {
        alias: {
            "ag-grid-react-component" : __dirname + "/node_modules/ag-grid-react-component/dist/ag-grid-react-component.js",
            "ag-grid" : __dirname + "/node_modules/ag-grid/dist/ag-grid.js",
            "ag-grid-root" : __dirname + "/node_modules/ag-grid/dist"
        }
    }
};