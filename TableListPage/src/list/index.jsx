import { useCallback, useMemo, useRef,  useEffect } from 'react';
import { connect, Link } from 'umi';
import { Form, Popconfirm, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

export const PAGE_NAME_UPPER_CAMEL_CASE= props => {
  const {
    location,
    history,
    loading,
    dispatch,
    BLOCK_NAME_CAMEL_CASE: { list, pagination, sorter, filter, search },
  } = props;

  const actionRef = useRef();
  const [searchRef] = Form.useForm(); // url变化dispatch

  useEffect(() => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/locationChanged',
      payload: location,
    });
  }, [location]); // current记录值变化重设form


  useEffect(() => {
    searchRef.current && searchRef.current.resetFields();
    searchRef.current && searchRef.current.setFieldsValue(search);
  }, [search, searchRef]); // 分页数据

  const paginationProps = useMemo(
    () => ({
      size: 'middle',
      defaultPageSize: 10,
      showTotal: total => `共${total}条`,
      showSizeChanger: true,
      showQuickJumper: true,
      current: pagination.pageNo || 1,
      pageSize: pagination.pageSize,
      total: pagination.total,
    }),
    [pagination],
  ); // 列表的分页、排序、筛选 onchange

  const handleTableChange = useCallback((pagination, filter, sorter) => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/handleTableChange',
      payload: {
        pagination,
        filter,
        sorter,
      },
    });
  }); // 查询

  const handleSearch =  useCallback(values => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/search',
      payload: values,
    });
  }) // 重置查询

  const handleSearchReset = useCallback(values => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/searchReset',
      payload: values,
    });
  }); // 提交新建/编辑表单


  const handleRemove = useCallback(record => {
    if (!record) return true;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/handleRemove',
      payload: {
        record,
      },
    });
  }); // 列表表头定义

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
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
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
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
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
        <Link to={{pathname: `ROUTE_PATH/edit/${record.id}`, state: {from: 'list'}}}>编辑</Link>
          <Divider type="vertical" />

          <Popconfirm
            key="delete"
            title="确认要删除该记录吗？"
            onConfirm={() => handleRemove(record)}
            okText="删除"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle={
          <Link to="ROUTE_PATH/new">
            <Button type="primary"><PlusOutlined /> 新建</Button>
          </Link>
        }
        loading={loading}
        size="default"
        toolBarRender={() => []}
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        options={false}
        search
        formRef={searchRef}
        onSubmit={handleSearch}
        onReset={handleSearchReset}
        onChange={handleTableChange}
        dataSource={list}
        pagination={paginationProps}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ BLOCK_NAME_CAMEL_CASE, loading }) => ({
  BLOCK_NAME_CAMEL_CASE,
  loading: loading.models.BLOCK_NAME_CAMEL_CASE,
}))(PAGE_NAME_UPPER_CAMEL_CASE);
