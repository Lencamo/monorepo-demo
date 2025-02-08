// scripts/generate-exports.js
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "./src/component");
const outputFile = path.join(__dirname, "./src/index.js");

// 1. 获取 src 下的一级文件夹列表
const folders = fs.readdirSync(srcDir).filter((file) => {
  const filePath = path.join(srcDir, file);
  return fs.statSync(filePath).isDirectory(); // 只保留文件夹
});

// 2. 过滤出包含 index.vue 的文件夹
const validFolders = folders.filter((folder) => {
  const vueFilePath = path.join(srcDir, folder, "index.vue");
  return fs.existsSync(vueFilePath); // 检查 index.vue 是否存在
});

// 3. 生成导入导出内容
const importStatements = validFolders
  .map((folder) => `import ${folder} from "./component/${folder}/index.vue";`)
  .join("\n");

const exportStatement = `export { ${validFolders.join(", ")} };`;

const content = `${importStatements}\n\n${exportStatement}`;

// 4. 写入文件
fs.writeFileSync(outputFile, content);

console.log("导出文件已生成！");
