import React from 'react'
import CollectionCard from './CollectionCard';
import {  Card } from "react-bootstrap";



export default function LatestCollections({ collections }) {
  return (
    <>

        { collections ? (
            <div className='collections-container'>
                <h1>Check Out The Latest Collections!</h1>
                {collections?.map(collection=> (
                    <CollectionCard key={collection?._id} collection={collection} />
                ))}
            </div>

            ) : ( <div>there are no collections in database </div> )
        }

    </>
  )
}