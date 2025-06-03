import api from './api';

const AUTH = 'auth'

const getProfile = async () => {
    const { data } = await api.get(`${AUTH}/me`);
    return data;
};

export default {
    getProfile
};
