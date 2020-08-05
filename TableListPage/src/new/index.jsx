import {useEffect, useCallback} from 'react'
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Form from '../components/Form'
import {Card} from 'antd'

const New = props => {

  const {
    dispatch, submiting,
    BLOCK_NAME_CAMEL_CASE: { formErrors },
  } = props


  useEffect(()=>()=>{
      dispatch({ type: 'BLOCK_NAME_CAMEL_CASE/setState', payload: {formErrors: {}} });
    }
  ,[1])

  const handleSubmit = useCallback((values) => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/submit',
      payload: {values},
    });
  })

  return (
    <PageHeaderWrapper>
      <Card title="新建" bordered={false}>
        <Form initialValues={{}} onSubmit={handleSubmit} errors={formErrors} loading={submiting}  />
      </Card>
    </PageHeaderWrapper>
  )}


export default connect(({ loading, BLOCK_NAME_CAMEL_CASE }) => ({
  BLOCK_NAME_CAMEL_CASE,
  submiting: loading.effects['BLOCK_NAME_CAMEL_CASE/submit'],
}))(New);
