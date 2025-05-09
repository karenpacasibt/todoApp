import api from './api';

const CATEGORY_ROUTE = 'category';

class CategoryService {
    async getAll(page = 1) {
        const { data } = await api.get(`${CATEGORY_ROUTE}?page=${page}`);
        return data;
    }

    async get(id) {
        const { data } = await api.get(`${CATEGORY_ROUTE}/${id}`);
        return data;
    }

    async store(params) {
        const { data } = await api.post(CATEGORY_ROUTE, params);
        return data;
    }

    async update(params, id) {
        const { data } = await api.put(`${CATEGORY_ROUTE}/${id}`, params);
        return data;
    }

    async delete(id) {
        const { data } = await api.delete(`${CATEGORY_ROUTE}/${id}`);
        return data;
    }
}

export default new CategoryService();