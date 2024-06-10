<h1 style="text-align: center;">
  XbrainMap
</h1>

[![npm-version](https://img.shields.io/npm/v/brain-map)](https://www.npmjs.com/package/brain-map)
![npm download](https://img.shields.io/npm/dm/brain-map)
![license](https://img.shields.io/npm/l/express.svg)
[![GitHub stars](https://img.shields.io/github/stars/Jabinuu/brain-map)](https://github.com/wanglin2/mind-map/stargazers)

> 一个简约而强大的 Web 思维导图应用

本项目作为一个思维导图应用程序，其内核依赖于另一个项目 —— [brainmap sdk]('https://github.com/Jabinuu/brain-map')。这是一套用 TypeScript 所创造的一个用于思维导图实现的SDK，有了它的帮助，任何开发者都可以实现一个属于自己的思维导图类应用，听起来是不是很酷？而本项目就是其中之一！

This project is a mind mapping application, and its core relies on another project — the brainmap SDK. This is an SDK created with TypeScript for implementing mind maps. With its help, any developer can create their own mind mapping application. Sounds cool, right? And this project is one of them!

## Features 特性

- [x] 支持思维导图常用的逻辑结构布局
- [x] 内置多种主题，支持在主题基础之上自定义思维导图的所有样式
- [x] 节点内容支持文本内容
- [x] 节点尺寸可通过精灵点进行自定义
- [x] 支持画布的拖动、缩放
- [x] 支持多选节点
- [x] 所有操作都支持快捷键
- [x] 支持历史记录，能够进行操作的回退和重做
- [x] 支持节点的展开、收起，以及一键整理布局
- [x] 插件化架构，所有非核心功能以插件的形式提供
- [x] 支持本地存储
> 
- [x] Supports common logical structure layouts for mind maps
- [x] Built-in multiple themes, with support for customizing all styles of the mind map based on these themes
- [x] Node content supports text content
- [x] Node size can be customized via control points
- [x] Supports canvas dragging and zooming
- [x] Supports multi-node selection
- [x] All operations support keyboard shortcuts
- [x] Supports history records, allowing undo and redo operations
- [x] Supports expanding and collapsing nodes, as well as one-click layout organization
- [x] Plugin architecture, with all non-core functionalities provided as plugins
- [x] Supports local storage

## Usage 用法
为了确保本项目能在您的环境中顺利运行，建议您所使用的包管理工具为pnpm@8.10.5

To ensure that this project runs smoothly in your environment, it is recommended that you use the package manager pnpm@8.10.5.
```
npm i -g pnpm@8.10.5
```
### Installation 安装
安装必要的依赖

Install the necessary dependencies
``` bash
pnpm i
```
### Run it 运行
```
pnpm run dev
```

## Demo 展示
![](https://pic.imgdb.cn/item/6666d7375e6d1bfa05349586.png)
![](https://pic.imgdb.cn/item/6666d6c95e6d1bfa053431ec.png)
![](https://pic.imgdb.cn/item/6666d6ef5e6d1bfa053459ab.png)
![](https://pic.imgdb.cn/item/6666d6f05e6d1bfa053459e5.png)
![](https://pic.imgdb.cn/item/6666d6f05e6d1bfa05345a2b.png)
![](https://pic.imgdb.cn/item/6666d6f05e6d1bfa05345a8a.png)
![](https://pic.imgdb.cn/item/6666d6f05e6d1bfa05345ac8.png)
![](https://pic.imgdb.cn/item/6666d7365e6d1bfa053494fb.png)
![](https://pic.imgdb.cn/item/6666d7375e6d1bfa05349553.png)

## Thanks 感谢
感谢[@wanglin2]('https://github.com/wanglin2')的启发

Thanks to @wanglin2 for the inspiration
