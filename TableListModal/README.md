## 介绍

TableListModal是封装的基本表格，弹窗表单的形式进行数据的新建、编辑，适用于数据较少的表单情况。

## 使用

基本使用
```sh
umi block add https://github.com/yautah/pro-blocks/TableListModal 
```

指定page，生成js文件
```sh
umi block add https://github.com/yautah/pro-blocks/TableListModal --path=/members --js
```

## 说明

执行block add命令后，目标path文件中会生成对应的文件。
config.js文件中为对应的router配置和menu的locals配置，根据实际情况拷贝至antd的route配置和locals配置。

## 已知问题

Hash History情况下，重新刷新当前列表，history的push到同一路径可能会有问题。
