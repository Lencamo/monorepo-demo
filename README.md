## 公共包思想

视频：https://www.bilibili.com/video/BV1e84y1B7s3/

我们可以将自己开发的工具 编写成一个单独的 npm 包，然后发布到 npm 仓库，其他项目可以直接安装使用。这样可以降低重复开发的成本，提高开发效率。

问题：包是公开的，想要私有化的话得搭建自己的 npm 服务器。

## monorepo 架构

### pnpm

软连接、磁盘空间
完美解决多项目整合 npm 包的依赖问题

https://pnpm.io/zh/

核心：支持 monorepos（pnpm 内置了对存储库中多个包的支持）

### 构建流程

文章：https://juejin.cn/post/7122265283451944974

1、依赖安装
pnpm 提供了 -w, --workspace-root 参数，可以将依赖包安装到工程的根目录下，作为所有 package 的公共依赖。

2、运行脚本
pnpm 提供了 -F ,--filter 参数，可以用来对特定的 package 进行某些操作。

### 共享组件和模块

文章：https://juejin.cn/post/7160229239840014343
