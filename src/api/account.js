export const postFareUrl = '/account/postFare'
export const accountList = '/account/list'
export const accountDelete = '/account/delete'
export const involveMe = '/account/involved'
export const accountStatisticsUrl = '/account/statistics'
export const accountStatistics = (params) => axios.post('/account/statistics', params)