import type { StorybookConfig } from '@storybook/nextjs'
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal(config, options) {
    config.plugins?.push(new VanillaExtractPlugin(), new MiniCssExtractPlugin())

    config.module?.rules?.forEach((rule) => {
      if (
        typeof rule === 'object' &&
        rule !== null &&
        rule.test instanceof RegExp &&
        rule.test.test('test.css')
      ) {
        rule.exclude = /\.vanilla\.css$/i
      }
    })

    config.module?.rules?.push({
      test: /\.vanilla\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: require.resolve('css-loader'),
          options: {
            url: false,
          },
        },
      ],
    })

    return config
  },
} satisfies StorybookConfig
