module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    ["module-resolver", {
      "alias": {
        "^react-native$": "react-native-web"
      }
    }]
  ],
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
      presets: ['react-native', 'es2015']
  }
};
