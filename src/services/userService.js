import api from './api';

const login = async (params) => {
    const { data } = await api.post('login', params);
    return data;
}
const logout = async (params) => {
    const { data } = await api.post('logout', params);
    return data;
}

export default {
    login, logout
};