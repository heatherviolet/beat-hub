import React, { useState } from 'react'

import empty from '../assets/images/addtoempty.png'

import { useMutation } from '@apollo/client';

import { ADD_TO_COLLECTION } from '../utils/mutations';

import { Redirect, Switch } from 'react-router-dom';

export default function CollPrev({ collection, _id }) {
    const [addToCollection, { collError }] = useMutation(ADD_TO_COLLECTION);
    const [response, changeResponse] = useState(false);

    // redirect to the specified album page if response was success
    const saveAlbum = async () => {
        if (_id) {
            await addToCollection({
                variables: { collId: collection._id, albumId: _id },
            }).then(changeResponse(true));
        }  
    }
    
    if (response) {
        return <Redirect to={`/collection/${collection._id}`}/>
    }

    return (
        <a className="point" onClick={() => saveAlbum() }>
            <div className="collection-back">
                <div className="image-wrap">
                    <h3 className="coll-title">{collection.name}</h3>
                    <div className="inner-coll">
                        {(collection.albumCollection.length > 3) ? (
                            <>
                                <div>
                                    <img width="150" height="150" src={collection.albumCollection[0].cover}/> 
                                    <img width="150" height="150" src={collection.albumCollection[1].cover}/> 
                                </div>
                                <div>
                                    <img width="150" height="150" src={collection.albumCollection[2].cover}/> 
                                    <img width="150" height="150" src={collection.albumCollection[3].cover}/> 
                                </div>
                            </>
                        ) : (collection.albumCollection.length < 3) ? (
                            <img width="300" height="300" src={collection.albumCollection[0].cover}></img>
                        ) : (
                            <img src={empty}/>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
}