import { history } from 'umi'
import qs from 'qs'
import { message } from 'antd'
import { isEmpty } from 'lodash'
import { queryRecords, queryRecord, updateRecord, createRecord, destroyRecord } from './service'

const Serializer = {
  stringify: ({ pagination = {}, filter = {}, sorter = {}, search = {} }) => {
    let query = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current || pagination.pageNo,
      ...search,
      sorter: sorter.field && sorter.order ? { field: sorter.field, order: sorter.order } : {},
    }

    let newFilter = {}
    Object.keys(filter).forEach(key => {
      if (!isEmpty(filter[key])) {
        newFilter[key] = filter[key]
      }
    })
    query.filter = newFilter

    return qs.stringify(query, { allowDots: true, skipNulls: true, arrayFormat: 'comma' })
  },

  parse: query => {
    let props = qs.parse(query, {
      skipNulls: true,
      allowDots: true,
      ignoreQueryPrefix: true,
      comma: true,
    })

    const { sorter = {}, filter = {}, pageNo, pageSize, ...search } = props

    let newSorter = {}
    if (sorter && sorter.field && sorter.order) {
      newSorter = { field: sorter.field, order: sorter.order }
    }

    let newFilter = {}
    Object.keys(filter).forEach(key => {
      const value = filter[key]
      if (!isEmpty(value)) {
        newFilter[key] = value
      }
    })

    return {
      pagination: { pageSize, pageNo },
      search,
      sorter: sorter,
      filter: filter,
    }
  },

  toParams: props => {
    const { sorter, filter, pagination, search } = props

    let params = { ...search, ...pagination, ...filter }

    if (!isEmpty(sorter)) {
      params.sorter = sorter.field + '|' + sorter.order
    }

    return params
  },
}

const Defaults = {
  pagination: { pageNo: 1, pageSize: 10 },
}

const Model = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {
    list: [],
    pagination: {},
    sorter: {},
    filter: {},
    search: {},
    current: {},
    formErrors: [], //{field: 'name', errors: []}
  },

  effects: {
    *locationChanged({ payload }, { put }) {
      const {
        search,
        filter,
        sorter,
        pagination: {
          pageSize = Defaults.pagination.pageSize,
          pageNo = Defaults.pagination.pageNo,
        },
      } = Serializer.parse(payload.search)
      yield put({ type: 'setState', payload: { search, filter, sorter } })
      yield put({
        type: 'fetch',
        payload: { search, filter, sorter, pagination: { pageSize, pageNo } },
      })
    },

    *fetch({ payload }, { call, put, select }) {
      const params = Serializer.toParams(payload)
      try {
        const response = yield call(queryRecords, params)
        const { data, ...rest } = response.data
        yield put({
          type: 'setState',
          payload: { list: data, pagination: rest },
        })
      } catch (e) {
        console.error(e)
      }
    },

    *fetchDetail({ payload }, { call, put, select }) {
      const { id } = payload
      try {
        const response = yield call(queryRecord, { id })
        if (response.status == 0) {
          const { data } = response
          yield put({ type: 'setState', payload: { current: data } })
        }
      } catch (e) {
        console.error(e)
      }
    },

    *handleTableChange({ payload }, { select }) {
      const { search } = yield select(state => state['BLOCK_NAME_CAMEL_CASE'])
      const { pagination, filter, sorter } = payload
      const dest = {
        pathname: history.location.pathname,
        search: Serializer.stringify({ pagination, filter, sorter, search }),
      }
      history.push(dest)
    },

    *search({ payload }, { select }) {
      const dest = {
        pathname: history.location.pathname,
        search: Serializer.stringify({ search: payload }),
      }
      history.push(dest)
    },

    *searchReset({ payload }, { put, call }) {},

    *submit({ payload }, { put }) {
      const { current } = payload
      const action = current && current.id ? 'handleUpdate' : 'handleCreate'
      yield put.resolve({ type: 'setState', payload: { formErrors: [] } })
      yield put.resolve({ type: action, payload })
    },

    *handleCreate({ payload }, { put, call }) {
      const { current, values } = payload
      try {
        const res = yield call(createRecord, values)
        if (res.status == 0) {
          message.success('记录创建成功')
          history.replace('ROUTE_PATH')
        } else {
          switch (res.status) {
            case 20001:
              yield put({
                type: 'setState',
                payload: {
                  formErrors: [{ field: 'name', errors: [res.error.msg || '名称已经被占用'] }],
                },
              })
              break
            default:
              break
          }
        }
      } catch (e) {
        console.error(e)
      }
    },

    *handleUpdate({ payload }, { put, call }) {
      const { current, values, state } = payload
      try {
        const res = yield call(updateRecord, { id: current.id, ...values })
        if (res.status == 0) {
          if (state && state.from == 'list') {
            message.success('记录更新成功')
            history.goBack()
          } else {
            history.replace('ROUTE_PATH')
          }
        }
      } catch (e) {
        console.error(e)
      }
    },

    *handleRemove({ payload }, { put, call }) {
      const { record } = payload
      try {
        const res = yield call(destroyRecord, { id: record.id })
        if (res.status == 0) {
          message.success('记录已删除')
          yield put({ type: 'reloadList' })
        }
      } catch (e) {
        console.error(e)
      }
    },

    *reloadList(_, { put, select }) {
      const {
        pagination: { pageSize, pageNo },
        sorter,
        filter,
        search,
      } = yield select(state => state['BLOCK_NAME_CAMEL_CASE'])
      yield put({
        type: 'fetch',
        payload: { pagination: { pageSize, pageNo }, sorter, filter, search },
      })
    },

    *resetList(_, { put, select }) {
      history.push(history.location.pathname)
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}

export default Model
