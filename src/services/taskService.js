import api from './api';

const TASK_ROUTE = 'tasks';

const getAll = async (page = 1) => {
    const { data } = await api.get(`${TASK_ROUTE}?page=${page}`);
    return data;
}

const get = async (id) => {
    const { data } = await api.get(`${TASK_ROUTE}/${id}`);
    return data;
}

const store = async (params) => {
    const { data } = await api.post(TASK_ROUTE, params);
    return data;
}

const update = async (id, params) => {
    const { data } = await api.put(`${TASK_ROUTE}/${id}`, params);
    return data.data;
}

const destroy = async (id) => {
    const { data } = await api.delete(`${TASK_ROUTE}/${id}`);
    return data;
}
export default {
    getAll, get, store, update, destroy
};