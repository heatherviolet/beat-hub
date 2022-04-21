import React from 'react';

import empty from '../../assets/images/addtoempty.png'

import { Link } from 'react-router-dom';

export default function Collection({ collection }) {
    return (
        <Link to={`/collection/${collection._id}`}>
            <div className="collection-back">
                <div className="image-wrap">
                    <h3 className="coll-title">{collection.name}</h3>
                    <div className="inner-coll">
                        {(collection.albumCollection.length === 0) ? (
                            <img src={empty}/>
                        ) : (collection.albumCollection.length < 4) ? (
                            <img width="300" height="300" src={collection.albumCollection[0].cover}></img>
                        ) : (
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
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}