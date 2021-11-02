const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js','.jsx']
    },
    entry: {
        app: ['./client'], //['./client.jsx', 'WordRelay.jsx'], 지만 저렇게만 써도 됨 (client에서 wordrelay 이미 가져오니까)
    }, //입력
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR','last 2 chrome versions'], //browserslist
                        },
                        debug: true,
                    }],
                     '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel' //핫리로드
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin() //핫리로드 관련
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist',
    }, //출력
    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: { directory: path.resolve(__dirname) },
        hot: true,
    },
};