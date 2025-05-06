import api from './api';

const TAG_ROUTE = 'tag';

class TagService {
    async getAll() {
        const { data } = await api.get(TAG_ROUTE);
        return data;
    }

    async getOne(id) {
        const { data } = await api.get(`${TAG_ROUTE}/${id}`);
        return data;
    }

    async store(params) {
        const { data } = await api.post(TAG_ROUTE, params);
        return data;
    }

    async update(params, id) {
        const { data } = await api.put(`${TAG_ROUTE}/${id}`, params);
        return data;
    }

    async delete(id) {
        const { data } = await api.delete(`${TAG_ROUTE}/${id}`);
        return data;
    }
}

export default new TagService();