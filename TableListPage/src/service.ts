import request from 'umi-request'

export async function queryRecords(params) {
  return request('/api/BLOCK_NAME_CAMEL_CASE', {
    params,
  })
}

export async function queryRecord(params) {
  return request('/api/BLOCK_NAME_CAMEL_CASE/detail', {
    params,
  })
}

export async function destroyRecord(params) {
  return request('/api/BLOCK_NAME_CAMEL_CASE/destroy', {
    method: 'POST',
    data: {
      ...params,
    },
  })
}

export async function createRecord(params) {
  return request('/api/BLOCK_NAME_CAMEL_CASE/create', {
    method: 'POST',
    data: {
      ...params,
    },
  })
}

export async function updateRecord(params) {
  return request('/api/BLOCK_NAME_CAMEL_CASE/update', {
    method: 'POST',
    data: {
      ...params,
    },
  })
}
