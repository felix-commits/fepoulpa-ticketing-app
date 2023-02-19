// process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module:react-native-dotenv',
        { moduleName: '@env', path: '.env', blacklist: null, whitelist: null, safe: false, allowUndefined: true },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './src/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
