import API from '@/config/apiClient'

export const login = async (data: object) => API.post('/auth/login', data)
