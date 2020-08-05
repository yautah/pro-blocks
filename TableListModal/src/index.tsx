import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { connect } from 'umi'
import { Form, Popconfirm, Button, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import TableForm from './components/TableForm'
import { isEmpty } from 'lodash'

//弹出框Form的props
const formProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  labelAlign: 'left',
}

export const PAGE_NAME_UPPER_CAMEL_CASE = props => {
  const {
    location,
    history,
    loading,
    submiting,
    dispatch,
    BLOCK_NAME_CAMEL_CASE: { list, pagination, sorter, filter, search, formErrors, modalVisible },
  } = props

  const [current, setCurrent] = useState(undefined)

  const actionRef = useRef()
  const [formRef] = Form.useForm()
  const [searchRef] = Form.useForm()

  //url变化dispatch
  useEffect(() => {
    dispatch({ type: 'BLOCK_NAME_CAMEL_CASE/locationChanged', payload: location })
  }, [location])

  //current记录值变化重设form
  useEffect(() => {
    if (!modalVisible) {
      formRef.current && formRef.current.resetFields()
      return
    }
    formRef.current && formRef.current.setFieldsValue(current)
  }, [modalVisible, current, formRef])

  useEffect(() => {
    if (formRef.current && !isEmpty(formErrors)) {
      const fields = formErrors.map(e => ({ name: e.field, errors: e.errors }))
      formRef.current.setFields(fields)
    }
  }, [formRef.current, formErrors])

  //表单form可见性
  const setModalVisible = useCallback(show => {
    dispatch({ type: 'BLOCK_NAME_CAMEL_CASE/setState', payload: { modalVisible: show } })
  })

  //同步url上的search
  useEffect(() => {
    searchRef.current && searchRef.current.resetFields()
    searchRef.current && searchRef.current.setFieldsValue(search)
  }, [search, searchRef])

  //分页数据
  const paginationProps = useMemo(() => {
    return {
      size: 'middle',
      defaultPageSize: 10,
      showTotal: total => `共${total}条`,
      showSizeChanger: true,
      showQuickJumper: true,
      current: pagination.pageNo || 1,
      pageSize: pagination.pageSize,
      total: pagination.total,
    }
  }, [pagination])

  //列表的分页、排序、筛选 onchange
  const handleTableChange = useCallback((pagination, filter, sorter) => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/handleTableChange',
      payload: { pagination, filter, sorter },
    })
  })

  //查询
  const handleSearch = values => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/search',
      payload: values,
    })
  }

  //重置查询
  const handleSearchReset = values => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/searchReset',
      payload: values,
    })
  }

  //提交新建/编辑表单
  const handleSubmit = useCallback(
    fields => {
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/submit',
        payload: { current, values: fields },
      })
    },
    [current],
  )

  //重置新建、编辑表单
  const handleReset = useCallback(() => {
    formRef.current && formRef.current.setFieldsValue(current)
  }, [formRef.current, current])

  //删除列表记录
  const handleRemove = record => {
    if (!record) return true
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/handleRemove',
      payload: { record },
    })
  }

  //列表表头定义
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInTable: true,
      hideInSearch: true,
      renderText: val => <img src={val} />,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: false,
      rules: [{ required: true, message: '规则名称为必填项' }],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      sortOrder: sorter.field == 'callNo' && sorter.order,
      hideInForm: true,
      hideInSearch: true,
      renderText: val => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: false,
      filters: true,
      filteredValue: filter.status ? filter.status.split(',') : [],
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '上次更新',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setCurrent(record)
              setModalVisible(true)
            }}>
            编辑
          </a>
          <Divider type="vertical" />

          <Popconfirm
            key="delete"
            title="确认要删除该记录吗？"
            onConfirm={() => handleRemove(record)}
            okText="删除"
            cancelText="取消">
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle={
          <Button
            type="primary"
            onClick={() => {
              setCurrent(undefined)
              setModalVisible(true)
            }}>
            <PlusOutlined /> 新建
          </Button>
        }
        loading={loading}
        size="default"
        toolBarRender={() => []}
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        options={false}
        search={true}
        formRef={searchRef}
        onSubmit={handleSearch}
        onReset={handleSearchReset}
        onChange={handleTableChange}
        dataSource={list}
        pagination={paginationProps}
      />

      <TableForm
        mode={current && current.id ? 'edit' : 'new'}
        loading={submiting}
        modalVisible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
        }}>
        <ProTable
          onSubmit={handleSubmit}
          onReset={handleReset}
          form={{ ...formProps }}
          rowKey="id"
          type="form"
          formRef={formRef}
          columns={columns}
        />
      </TableForm>
    </PageHeaderWrapper>
  )
}

export default connect(({ BLOCK_NAME_CAMEL_CASE, loading, submiting }) => ({
  BLOCK_NAME_CAMEL_CASE,
  loading: loading.models.BLOCK_NAME_CAMEL_CASE,
  submiting: loading.effects['BLOCK_NAME_CAMEL_CASE/submit'],
}))(PAGE_NAME_UPPER_CAMEL_CASE)
