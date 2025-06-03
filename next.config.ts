import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    // `^data-test`にマッチする属性を削除
    reactRemoveProperties: true
  }
}

export default nextConfig
