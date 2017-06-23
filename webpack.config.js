module.exports = {
    entry: './src/main.js',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['ng-annotate', 'babel-loader']
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loaders: ['raw-loader']
            }
        ]
    }

};
