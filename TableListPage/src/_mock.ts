// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url'

const delay = millsec => {
  return new Promise(resolve => {
    setTimeout(resolve, millsec)
  })
}

// mock tableListDataSource
const genList = (current, pageSize) => {
  const tableListDataSource = []

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i
    tableListDataSource.push({
      id: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `Record ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: (Math.floor(Math.random() * 10) % 4).toString(),
      updatedAt: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    })
  }

  tableListDataSource.reverse()
  return tableListDataSource
}

let tableListDataSource = genList(1, 100)

async function getRecords(req, res, u) {
  await delay(1000)
  let realUrl = u

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url
  }

  const { current = 1, pageSize = 10 } = req.query
  const params = parse(realUrl, true).query
  let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize)

  if (params.sorter) {
    const sort = params.sorter.split('|')
    const sorter = {
      [`${sort[0]}`]: sort[1],
    }

    if (sorter) {
      dataSource = dataSource.sort((prev, next) => {
        let sortNumber = 0
        Object.keys(sorter).forEach(key => {
          if (sorter[key] === 'descend') {
            if (prev[key] - next[key] > 0) {
              sortNumber += -1
            } else {
              sortNumber += 1
            }

            return
          }

          if (prev[key] - next[key] > 0) {
            sortNumber += 1
          } else {
            sortNumber += -1
          }
        })
        return sortNumber
      })
    }
  }

  if (params.status) {
    const filter = {
      status: params.status.split(','),
    }
    dataSource = dataSource.filter(item => filter.status.includes(item.status))
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.includes(params.name || ''))
  }

  const result = {
    request: 'http://axibei.weifenxiaotest.cn/s/emp/list?pageNo=1&pageSize=10',
    serverTime: 1596013556005,
    status: 0,
    data: {
      data: dataSource,
      pageNo: parseInt(`${params.pageNo}`, 10) || 1,
      pageSize: parseInt(pageSize) || 10,
      total: tableListDataSource.length,
    },
  }
  return res.json(result)
}

async function createRecord(req, res, u, b) {
  const result = {
    request: 'http://axibei.weifenxiaotest.cn/s/emp/list?pageNo=1&pageSize=10',
    serverTime: 1596013556005,
    status: 0,
  }

  await delay(1000)

  const body = (b && b.body) || req.body
  const { method, name, desc, id } = body

  if (tableListDataSource.some(r => r.name == name)) {
    result.status = 20001
    result.error = { id: 'adfasdfasdfasdf', msg: '该名字已被使用' }
    res.json(result)
    return
  }

  const i = Math.ceil(Math.random() * 10000)
  const newRecord = {
    id: tableListDataSource.length,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name,
    owner: '曲丽丽',
    desc,
    callNo: Math.floor(Math.random() * 1000),
    status: (Math.floor(Math.random() * 10) % 2).toString(),
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: Math.ceil(Math.random() * 100),
  }
  tableListDataSource.unshift(newRecord)
  result.data = newRecord
  res.json(result)
}

async function updateRecord(req, res, u, b) {
  await delay(1000)
  const result = {
    request: 'http://axibei.weifenxiaotest.cn/s/emp/list?pageNo=1&pageSize=10',
    serverTime: 1596013556005,
    status: 0,
  }
  const body = (b && b.body) || req.body
  const { method, name, desc, id } = body
  let newRecord = {}
  tableListDataSource = tableListDataSource.map(item => {
    if (item.id === id) {
      newRecord = { ...item, desc, name }
      return { ...item, desc, name }
    }

    return item
  })
  result.data = newRecord
  res.json(result)
}

async function destroyRecord(req, res, u, b) {
  await delay(1000)
  const result = {
    request: 'http://axibei.weifenxiaotest.cn/s/emp/list?pageNo=1&pageSize=10',
    serverTime: 1596013556005,
    status: 0,
  }
  const body = (b && b.body) || req.body
  const { method, name, desc, id } = body
  tableListDataSource = tableListDataSource.filter(item => item.id != id)
  res.json(result)
}

async function queryRecord(req, res, u, b) {
  await delay(1000)
  const result = {
    request: 'http://axibei.weifenxiaotest.cn/s/emp/list?pageNo=1&pageSize=10',
    serverTime: 1596013556005,
    status: 0,
  }

  const { id } = req.query
  const record = tableListDataSource.find(item => {
    return item.id == parseInt(id)
  })
  result.data = record

  res.json(result)
}

export default {
  'GET /api/BLOCK_NAME_CAMEL_CASE': getRecords,
  'GET /api/BLOCK_NAME_CAMEL_CASE/detail': queryRecord,
  'POST /api/BLOCK_NAME_CAMEL_CASE/create': createRecord,
  'POST /api/BLOCK_NAME_CAMEL_CASE/update': updateRecord,
  'POST /api/BLOCK_NAME_CAMEL_CASE/destroy': destroyRecord,
}
