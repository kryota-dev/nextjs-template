import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    // NOTE: `^data-test`にマッチする属性を削除
    reactRemoveProperties: true,
  },
  // NOTE: `pino`を使用するための設定
  serverExternalPackages: ['pino'],
  webpack(config) {
    config.node = {
      ...config.node,
      __filename: true,
      __dirname: true,
    }
    return config
  },
}

export default nextConfig
