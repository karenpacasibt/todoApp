import api from './api';

const CATEGORY_ROUTE = 'category';

const getAll = async (page = 1) => {
    const { data } = await api.get(`${CATEGORY_ROUTE}?page=${page}`);
    return data;
}

const get = async (id) => {
    const { data } = await api.get(`${CATEGORY_ROUTE}/${id}`);
    return data;
}

const store = async (params) => {
    const { data } = await api.post(CATEGORY_ROUTE, params);
    return data;
}

const update = async (params, id) => {
    const { data } = await api.put(`${CATEGORY_ROUTE}/${id}`, params);
    return data;
}

const destroy = async (id) => {
    const { data } = await api.delete(`${CATEGORY_ROUTE}/${id}`);
    return data;
}


export default {
    getAll, get, store, update, destroy
};