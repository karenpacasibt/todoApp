const BASE_URL = 'http://proyecto-todolist.test/api/tag'; 

class TagService {
  async getAll() {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error al obtener tags');
    return await response.json();
  }

  async getOne(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener el tag');
    return await response.json();
  }

  async store(params) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Error al crear el tag');
    return await response.json();
  }

  async update(params, id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Error al actualizar el tag');
    return await response.json();
  }

  async delete(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el tag');
    return await response.json();
  }
}

export default new TagService();
