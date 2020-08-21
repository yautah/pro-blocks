import {useState, useCallback, useEffect, useMemo} from 'react'
import { Button,   Form, Input,  Select } from 'antd';
import {isEmpty} from 'lodash'
import FooterToolbar from './FooterToolbar';

const { Option } = Select;

const layout = {
  labelCol: { xl: 2, lg:3 ,md:4, sm:24},
  wrapperCol: {
    xl: {span: 12},
    lg: {span: 17},
    md: {span: 16},
    sm: {span: 24},
  },
};

const tailLayout = {
  wrapperCol: {
    xl: {offset: 2},
    lg: {offset: 3},
    md: {offset: 4},
    sm: {},
  }
};

const TableForm = props => {

  const {onSubmit, errors, loading, initialValues, fixedFooter } = props

  const [form] = Form.useForm();

  useEffect(()=>{
    if (form && !isEmpty(errors)) {
      const fields = errors.map(e=> ({name: e.field,  errors: e.errors}))
      form.setFields(fields);
    }
  }, [form, errors])

  useEffect(()=>{
    if (form) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues])


  const onFinish =useCallback((values)=>{
    onSubmit(values)
  }, [onSubmit])

  const onReset = useCallback(()=>{
    form.resetFields()
    form.setFieldsValue(initialValues)
  }, [initialValues])

  const onFinishFailed = useCallback((errorInfo)=>{
    console.log('Failed:', errorInfo);
  })

  return (
    <Form
      form={form}
      size="default"
      {...layout}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Form.Item
        label="规则名称"
        name="name"
        rules={[
          {
            required: true,
            message: '请输入规则名称',
          },
        ]} >
        <Input placeholder="请输入规则名称" />
      </Form.Item>


      <Form.Item
        label="状态"
        name="status"
        rules={[
          {
            required: true,
            message: '请设置状态',
          },
        ]} >
        <Select placeholder="请设置状态">
          <Option value="0">异常</Option>
          <Option value="1">关闭</Option>
          <Option value="2">已上线</Option>
          <Option value="3">运行中</Option>
        </Select>
      </Form.Item>


      <Form.Item
        label="规则描述"
        name="desc"
        rules={[
          {
            required: true,
            message: '请输入规则描述',
          },
        ]} >
        <Input.TextArea rows={4} placeholder="请输入" />
      </Form.Item>

      {fixedFooter ?
          <FooterToolbar>
            <Button loading={loading} type="primary" htmlType="submit">保存</Button>
            <Button onClick={onReset} style={{marginLeft: '12px'}} type="plain" htmlType="reset">
              重置
            </Button>
          </FooterToolbar> :
          <Form.Item {...tailLayout}>
            <Button loading={loading} type="primary" htmlType="submit">保存</Button>
            <Button onClick={onReset} style={{marginLeft: '12px'}} type="plain" htmlType="reset">
              重置
            </Button>
          </Form.Item>
      }

        </Form>
  )}

export default TableForm
