## 介绍

TableListPage是封装的基本表格列表，包含数据查询、搜索、翻页、删除，以跳转新路由的方式进行数据的新建、删除，适用数据较多的场景。

## 使用

基本使用
```sh
umi block add https://github.com/yautah/pro-blocks/TableListPage
```

指定page，生成js文件
```sh
umi block add https://github.com/yautah/pro-blocks/TableListPage --path=/members --js
```

## 说明

执行block add命令后，目标path文件中会生成对应的文件。
config.js文件中为对应的router配置和menu的locals配置，根据实际情况拷贝至antd的route配置和locals配置。

新建和编辑的页面引用的TableForm组件Api如下：

### TableForm

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValues | 表单数据（受控属性） | Object (详见antd的Table的initialValues数据结构） | {} |
| errors | 表单field的错误 | Object:(field:string, errors: [string]) | {} |
| loading | 表单提交loading | boolean | false |
| fixedFooter |是否使用底部fixed形式的提交按钮 | boolean | false |
| onSubmit | 表单提交事件 | `(values: object) => void;` | - |


## 已知问题

Hash History情况下，重新刷新当前列表，history的push到同一路径可能会有问题。
