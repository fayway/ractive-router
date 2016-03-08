module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', './demo/app.js']
    },
    output: {
        path: './demo',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /(\.js)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool: "#inline-source-map",
    debug: true
}