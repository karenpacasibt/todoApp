import api from './api';

const TAG_ROUTE = 'tags';

const getAll = async (page = 1) => {
    const { data } = await api.get(`${TAG_ROUTE}?page=${page}`);
    return data;
}

const get = async (id) => {
    const { data } = await api.get(`${TAG_ROUTE}/${id}`);
    return data;
}

const store = async (params) => {
    const { data } = await api.post(TAG_ROUTE, params);
    return data;
}

const update = async (params, id) => {
    const { data } = await api.put(`${TAG_ROUTE}/${id}`, params);
    return data;
}

const destroy = async (id) => {
    const { data } = await api.delete(`${TAG_ROUTE}/${id}`);
    return data;
}


export default {
    getAll, get, store, update, destroy
};