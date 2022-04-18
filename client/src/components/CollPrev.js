import React from 'react'

import empty from '../assets/images/addtoempty.png'

import { useMutation } from '@apollo/client';

import { ADD_ALBUM, ADD_TO_COLLECTION } from '../utils/mutations';

export default function CollPrev({ collection, _id }) {
    const [addToCollection, { collError }] = useMutation(ADD_TO_COLLECTION);
    const [addAlbum, { albumError }] = useMutation(ADD_ALBUM);

    const saveAlbum = async () => {
        if (_id) {
            await addToCollection({
                variables: { collId: collection._id, albumId: _id },
            }).then(console.log('done!'))
        }  
    }

    return (
        <a className="point" onClick={() => saveAlbum()}>
            <div className="collection-back">
                <div className="image-wrap">
                    <h3 className="coll-title">{collection.name}</h3>
                    <div className="inner-coll">
                        {collection.albumCollection.length ? (
                            <img src={collection.albumCollection[0].cover}/> 
                        ) : (
                            <img src={empty}/>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
}