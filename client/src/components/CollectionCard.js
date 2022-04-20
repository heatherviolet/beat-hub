import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import empty from '../assets/images/addtoempty.png'

export default function CollectionCard({ collection }) {

    const [response, changeResponse] = useState(false);

    if (response) {
        return <Redirect to={`/collection/${collection._id}`}/>
    }

    return (
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
    );
}