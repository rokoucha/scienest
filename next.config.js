import createBundleAnalyzer from '@next/bundle-analyzer'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    swcMinify: true,
    typedRoutes: true,
  },
  reactStrictMode: true,
}

export default withBundleAnalyzer(withVanillaExtract(nextConfig))
