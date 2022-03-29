module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          api: './src/api',
          app: './src/app',
          hooks: './src/hooks',
          modules: './src/modules',
          routes: './src/routes',
          shared: './src/shared',
          typings: './src/typings',
          utils: './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ], // react-native-reanimated/plugin should be the last one
}
