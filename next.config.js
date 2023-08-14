import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const createBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? (await import('@next/bundle-analyzer')).default
    : () => (config) => config

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: true,
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
