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
  ...(process.env.NODE_ENV !== 'development' &&
    process.env.NEXT_PUBLIC_BASE_PATH && {
      basePath: process.env.NEXT_PUBLIC_BASE_PATH,
      assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
      distDir: `out${process.env.NEXT_PUBLIC_BASE_PATH}`,
    }),
}

export default nextConfig
