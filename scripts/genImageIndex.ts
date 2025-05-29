import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const baseDir = path.resolve('src/images')
const indexPath = path.join(baseDir, 'index.ts')
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']

const toCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

const toPascalCase = (str: string) => {
  const camel = toCamelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

const stripTrailingS = (str: string) =>
  str.endsWith('s') ? str.slice(0, -1) : str

const formatExportName = (file: string, parentDir: string, ext: string) => {
  const baseName = toCamelCase(path.basename(file, ext))
  const exportName = `${baseName}${toPascalCase(stripTrailingS(parentDir))}`
  const formatExt =
    ext.replace('.', '').charAt(0).toUpperCase() + ext.replace('.', '').slice(1)
  return { exportName, formatExt }
}

const generateExports = (dir: string, parentDir = '') => {
  const files = fs.readdirSync(dir)
  let exports = ''

  files.forEach((file: string) => {
    const fullPath = path.join(dir, file)
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')
    const ext = path.extname(file)

    if (fs.lstatSync(fullPath).isDirectory()) {
      exports += generateExports(
        fullPath,
        `${parentDir}${toPascalCase(stripTrailingS(file))}`,
      )
    } else if (imageExtensions.includes(ext)) {
      const { exportName, formatExt } = formatExportName(file, parentDir, ext)
      const baseExport = `import ${exportName}${formatExt} from './${relativePath}';\nexport const ${exportName} = ${exportName}${formatExt}`
      exports +=
        ext === '.svg'
          ? `${baseExport} as StaticImageData;\n`
          : `${baseExport};\n`
    }
  })

  return exports
}

const writeIndexFile = () => {
  const doc = `/**\n * 'scripts/genImageIndex.ts'で生成されたファイルです。\n * WARNING: このファイルは手動で変更しないでください！\n * WARNING:  画像ファイルを追加・変更・削除した場合は、\`make pnpm/gen-imageIndex\`を実行してください！\n */\n`
  const staticImageDataImport = `import { StaticImageData } from 'next/image';\n\n`
  const exports = generateExports(baseDir)
  fs.writeFileSync(indexPath, doc + staticImageDataImport + exports, 'utf-8')
}

writeIndexFile()
console.log('src/images/index.ts has been generated successfully.')

// Run prettier and eslint
try {
  execSync('pnpm exec prettier --write src/images/index.ts', {
    stdio: 'inherit',
  })
  execSync('pnpm exec eslint --fix src/images/index.ts', { stdio: 'inherit' })
} catch (error) {
  console.error('Error running Prettier or ESLint:', error)
  process.exit(1)
}
