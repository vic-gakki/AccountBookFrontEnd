export const login = params => axios.post('/user/login', params)
export const getInfo = params => axios.post('/user/info', params)
export const logout = params => axios.post('/user/logout', params)
