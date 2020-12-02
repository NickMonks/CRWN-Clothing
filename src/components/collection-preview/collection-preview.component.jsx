import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss';

/* functional components are always rendered calling the function */
const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
        {items
        .filter((item, idx) => idx <4)
        .map((item) => (//     key is an identifier
                        //      React needs it 
                <CollectionItem key={item.id} item={item}/>
            ))}
        </div>
    </div>
);

export default CollectionPreview;

