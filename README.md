# FIBOS 节点保活模块

## 模块作用

fibos-alive 可以让你的 FIBOS 节点在异常退出时(kill、coredump)，能够立刻拉取最新的区块备份数据并恢复节点运行。避免因为异常退出导致你的节点不可用的情况，使你的 FIBOS 节点永远处于「活」的状态。

## 快速开始

1.1 安装 fibos-alive 模块

```
fibos --install fibos-alive
```

1.2 添加 fibos-alive 模块

```js
//添加节点保活模块
require("fibos-alive")({
    backup_url:'http://ghost.bp.fo'
})
let fibos = require('fibos');
...
fibos.start();
```

[实例代码](./example/seed.js)

1.3 节点启动

在你的启动命令中增加 `--keepalive` ,例如：`fibos seed.js --keepalive`

## 参数说明

2.1 配置参数

| 参数 | 默认值 | 含义 |
| --- | --- | --- |
| backup_url | http://ghost.bp.fo | 备份文件获取地址 |

2.2 启动参数

| 参数 |含义 |
| --- | --- |
| --keepalive | 以保护模式启动节点 |

## 实现原理

使用 fibjs 的 `process.start()` 方法将节点启动程序以子进程的形式启动。
节点程序启动后，监听节点程序信号。当监听到程序异常退出信号时，自动获取最新区块数据后重启节点服务。