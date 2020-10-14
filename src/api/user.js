export const login = params => axios.post('/user/login', params)
export const getInfo = () => axios.post('/user/info')
export const logout = () => axios.post('/user/logout')
export const updatePass = '/user/updatePass'
export const userListUrl = '/user/list'
