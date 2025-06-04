export async function register() {
  // "msw/node"がNode.jsランタイムでのみ利用可能（=Edgeランタイムで利用不可）
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.MSW_ENABLED === 'true'
  ) {
    const { setupNextMocks } = await import('./libs/msw/nextjs')
    setupNextMocks()
  }
}
