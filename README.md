# FIBOS 节点保活模块

## 使用说明

```js
// 在节点启动文件中
require("fibos-alive")({
    backup_url:'http://ghost.bp.fo'
})
```

缺省参数:

| 参数 | 默认值 | 含义 |
| --- | --- | --- |
| backup_url | backup_url: http://ghost.bp.fo | 文件获取地址 |

节点启动:

执行命令中带 `--keepalive` 实例: `fibos seed.js --keepalive`


## 实现原理

使用 fibjs 的 `process.start()` 方法将节点启动程序以子进程的形式启动。
节点程序启动后，监听节点程序信号。当监听到程序异常退出信号时，自动获取最新区块数据后重启节点服务。