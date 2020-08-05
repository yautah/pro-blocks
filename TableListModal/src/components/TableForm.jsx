import { Modal, Spin } from 'antd'

const TableForm = props => {
  const { modalVisible, onCancel, loading, mode } = props

  return (
    <Modal
      forceRender
      title={mode == 'edit' ? '编辑' : '新建'}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}>
      <Spin spinning={!!loading}>{props.children}</Spin>
    </Modal>
  )
}

export default TableForm
