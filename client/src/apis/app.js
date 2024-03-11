import axios from '../axios'

export const apiGetCategoreis = (params) =>
  axios({ url: '/productcategory/', method: 'GET', params: params })
