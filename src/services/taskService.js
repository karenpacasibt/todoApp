import api from './api';

const TASK_ROUTE = 'task';

class TagService {
    async getAll(page = 1) {
        const { data } = await api.get(`${TASK_ROUTE}?page=${page}`);
        return data;
    }

    async get(id) {
        const { data } = await api.get(`${TASK_ROUTE}/${id}`);
        return data;
    }

    async store(params) {
        const { data } = await api.post(TASK_ROUTE, params);
        return data;
    }

    async update(params, id) {
        const { data } = await api.put(`${TASK_ROUTE}/${id}`, params);
        return data;
    }

    async delete(id) {
        const { data } = await api.delete(`${TASK_ROUTE}/${id}`);
        return data;
    }
}

export default new TagService();