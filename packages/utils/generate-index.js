// generate-index.js
const fs = require('fs')
const path = require('path')

// 设置源目录和目标文件
const srcDir = path.join(__dirname, 'src')
const indexPath = path.join(__dirname, 'index.js')

// 读取 src 目录下所有 .js 文件，排除 index.js 文件
const files = fs.readdirSync(srcDir).filter((file) => {
  return (
    fs.statSync(path.join(srcDir, file)).isFile() && file.endsWith('.js') && file !== 'index.js'
  )
})

// 生成导入语句
const imports = files
  .map((file) => {
    const moduleName = path.basename(file, '.js') // 获取文件名作为模块名
    return `import ${moduleName} from './src/${moduleName}';` // 生成导入语句
  })
  .join('\n')

// 生成导出语句
const moduleExports = files
  .map((file) => {
    const moduleName = path.basename(file, '.js')
    return `${moduleName},` // 生成导出语句
  })
  .join('\n')

// 生成完整的 index.js 文件内容
const indexContent = `${imports}\n\nexport { ${moduleExports} };\n`

// 将生成的内容写入 index.js
fs.writeFileSync(indexPath, indexContent)

console.log('index.js 文件已自动生成')
