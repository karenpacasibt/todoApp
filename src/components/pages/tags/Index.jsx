import { useEffect, useState } from 'react';
import TagService from '@services/tagService';

function Tag() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        TagService.getAll()
            .then(data => { setTags(data.data ?? data); })
            .catch(err => console.error(err));
        TagService.getOne(1).then(data => console.log('getOne:', data));
        TagService.store({ name: 'nuevo tag' }).then(data => console.log('store:', data));
        TagService.update({ name: 'Meditación ' }, 6).then(data => console.log('update:', data));
        TagService.delete(26).then(data => console.log('delete:', data));
    }, []);

    return (
        <div>
            <h2>Tags:</h2>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}>{tag.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Tag;