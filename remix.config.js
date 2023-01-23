/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverBuildTarget: 'cloudflare-pages',
  server: './src/server.js',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'src',
  assetsBuildDirectory: 'public/build',
  serverBuildPath: 'functions/[[path]].js',
  publicPath: '/build/',
}
