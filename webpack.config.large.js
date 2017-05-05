module.exports = {
    entry: "./src-large/index.js",
	devServer: {
		inline:true,
		port: 8008
	},
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
            "ag-grid-root" : __dirname + "/node_modules/ag-grid"
        }
    }
};