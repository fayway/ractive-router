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
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    devtool: "#inline-source-map",
    debug: true
}