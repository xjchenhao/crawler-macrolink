# crawler-macrolink
一家制药网站的爬虫，它是一个练习项目。


## vscode调试TypeScript
实现ts修改后自动build出js，按F5进入debug模式输出结果。

要点：
1. `tsconfig.json`配置打开`sourceMap:true`
2. `./vscode/tasks.json`检测文件改变自动编译
3. `./vscode/launch.json`配置debug的启动脚本

> 辅助阅读：[https://segmentfault.com/a/1190000011935122#articleHeader1](https://segmentfault.com/a/1190000011935122#articleHeader1)

## 封装async-node-crawler模块
继承[node-crawler](https://github.com/bda-research/node-crawler)模块，使之支持async/await语法。

> github地址：[https://github.com/xjchenhao/async-node-crawler](https://github.com/xjchenhao/async-node-crawler)