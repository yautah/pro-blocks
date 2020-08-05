import {useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import { connect } from 'umi';
import { Spin, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Form from '../components/Form'

const Edit = props => {

  const {
    dispatch, location, submiting,loading,
    BLOCK_NAME_CAMEL_CASE: { formErrors, current },
  } = props


  useEffect(()=>()=>{
      dispatch({ type: 'BLOCK_NAME_CAMEL_CASE/setState', payload: {formErrors: {}, current: {}} });
    }
  ,[1])

  const {id} = useParams()

  useEffect(()=> {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchDetail',
      payload: {id},
    });
  }, [id])


  const handleSubmit = useCallback((values) => {
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/submit',
      payload: {current, values, state: location.state},
    });
  },[current, location.state])

  return (
    <PageHeaderWrapper>
      <Card title="编辑" bordered={false}>
        <Spin spinning={loading}>
          <Form initialValues={current}  errors={formErrors} loading={submiting}  onSubmit={handleSubmit} />
        </Spin>
      </Card>
    </PageHeaderWrapper>
  )}


export default connect(({ loading, BLOCK_NAME_CAMEL_CASE }) => ({
  BLOCK_NAME_CAMEL_CASE,
  submiting: loading.effects['BLOCK_NAME_CAMEL_CASE/submit'],
  loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchDetail'],
}))(Edit);
