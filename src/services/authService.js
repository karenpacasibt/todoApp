
import api from './api';

const AUTH = 'auth';

const login = async (credentials) => {
    const { data } = await api.post( `${AUTH}/login`,credentials);
    localStorage.setItem('token', data.token);
    return data;
};

const register = async (userData) => {
    const { data } = await api.post(`${AUTH}/register`, userData);
    return data;
};

const logout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    window.location.href = `${AUTH}/login`;
};

export default {
    login, register, logout
};