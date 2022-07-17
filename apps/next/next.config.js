/** @type {import('next').NextConfig} */

const { withNativebase } = require('@native-base/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images');
const { withExpo } = require('@expo/next-adapter')

module.exports = withNativebase({
  dependencies: ['@expo/next-adapter', 'react-native-vector-icons', 'react-native-vector-icons-for-web', 'solito', 'app'],
  plugins: [[withFonts, { projectRoot: __dirname }], [withImages, { projectRoot: __dirname }], [withExpo, { projectRoot: __dirname }]],
  nextConfig: {
    projectRoot: __dirname,
    reactStrictMode: true,
    webpack5: true,
    webpack: (config, options) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-native$': 'react-native-web',
      }
      config.resolve.extensions = [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions,
      ]
      return config
    },
    images: {
      disableStaticImages: true
    }
  },
})