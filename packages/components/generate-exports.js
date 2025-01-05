const fs = require('fs')
const path = require('path')

// 定义组件库的根目录和 package.json 文件路径
const componentsDir = path.join(__dirname, 'src')
const packageJsonPath = path.join(__dirname, 'package.json')

// 获取文件夹中的 `.vue` 文件
function getVueFiles(dir) {
  return fs.readdirSync(dir).filter((file) => file.endsWith('.vue') && file !== 'index.vue')
}

// 生成顶层 index.js
function generateTopLevelIndex() {
  const componentFiles = getVueFiles(componentsDir)
  const exports = componentFiles
    .map((file) => {
      const componentName = path.basename(file, '.vue')
      return `export { default as ${componentName} } from './${componentName}.vue';`
    })
    .join('\n')

  // 写入 src/index.js 文件
  fs.writeFileSync(path.join(componentsDir, 'index.js'), exports)
  console.log('顶层 index.js 已生成')
}

// 生成子模块的 index.js
function generateSubModuleIndex(subDir) {
  const subDirPath = path.join(componentsDir, subDir)
  const vueFiles = getVueFiles(subDirPath)

  if (vueFiles.length > 0) {
    const exports = vueFiles
      .map((file) => {
        const componentName = path.basename(file, '.vue')
        return `export { default as ${componentName} } from './${componentName}.vue';`
      })
      .join('\n')

    // 在子目录中创建 index.js 文件
    const subIndexPath = path.join(subDirPath, 'index.js')
    fs.writeFileSync(subIndexPath, exports)
    console.log(`子模块 ${subDir} 的 index.js 已生成`)
  }
}

// 生成 package.json 的 exports 配置
function generateExportsConfig() {
  const exportsConfig = {}

  // 1. 处理顶层组件
  exportsConfig['.'] = {
    import: './src/index.js',
    require: './src/index.js'
  }

  // 2. 处理子模块
  const subDirs = fs
    .readdirSync(componentsDir)
    .filter((file) => fs.statSync(path.join(componentsDir, file)).isDirectory())
  subDirs.forEach((subDir) => {
    const subDirPath = path.join(componentsDir, subDir)
    const vueFiles = getVueFiles(subDirPath)

    if (vueFiles.length > 0) {
      // 导出子模块的 index.js 文件
      exportsConfig[`./${subDir}`] = {
        import: `./src/${subDir}/index.js`,
        require: `./src/${subDir}/index.js`
      }
    }
  })

  return exportsConfig
}

// 更新 package.json 的 exports 字段
function updatePackageJson(exportsConfig) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  packageJson.exports = exportsConfig

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('package.json 的 exports 字段已更新')
}

// 自动化执行所有操作
function generateComponentsExports() {
  // 1. 生成顶层 index.js 文件
  generateTopLevelIndex()

  // 2. 生成子模块的 index.js 文件
  const subDirs = fs
    .readdirSync(componentsDir)
    .filter((file) => fs.statSync(path.join(componentsDir, file)).isDirectory())
  subDirs.forEach((subDir) => generateSubModuleIndex(subDir))

  // 3. 生成 exports 配置并更新 package.json
  const exportsConfig = generateExportsConfig()
  updatePackageJson(exportsConfig)
}

// 执行脚本
generateComponentsExports()
