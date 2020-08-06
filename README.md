# pro-blocks

fork 自 AntDesign 的 pro-blocks。使用区块可以快速生成列表脚手架，区块相关概念参见：

[Ant Design Pro V4](https://github.com/ant-design/ant-design-pro)
[UmiJS 区块](https://umijs.org/zh/guide/block.html#%E5%8C%BA%E5%9D%97%E5%BC%80%E5%8F%91)
[Ant Design Pro Blocks](https://github.com/ant-design/pro-blocks)


## 使用

```shell
umi block add [block github url]
```


## 开发和调试

```shell
npm install
npm run start 'block_name'
```

## 扩展区块

### TableListModal 

基本表格列表，弹窗进行数据的新增、编辑，适用于简单表单的数据列表。更多说明见： [TableListModal](https://github.com/yautah/pro-blocks/tree/master/TableListModal). 


```bash
umi block add https://github.com/yautah/pro-blocks/tree/master/TableListModal --path=/path --js
```


### TableListPage

基本表格列表，跳转新路由的方式进行数据的新增、编辑，适用于表单较复杂的数据列表。更多说明见： [TableListPage](https://github.com/yautah/pro-blocks/tree/master/TableListPage). 


```bash
umi block add https://github.com/yautah/pro-blocks/tree/master/TableListPage --path=/path --js
```






