import { useEffect, useState } from 'react';
import CategoryService from '@services/categoryService';

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAll()
            .then(data => { setCategories(data.data ?? data); })
            .catch(err => console.error(err));
        CategoryService.get(1).then(data => console.log('getOne:', data));
        CategoryService.store({ name: 'nueva categoria' }).then(data => console.log('store:', data));
        CategoryService.update({ name: 'Compras por el centro' }, 6).then(data => console.log('update:', data));
        //CategoryService.delete(26).then(data => console.log('delete:', data));
    }, []);

    return (
        <div>
            <h2>Categories:</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Category