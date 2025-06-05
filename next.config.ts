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
}

export default nextConfig
