const path = require('path');

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
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    }, //출력
};