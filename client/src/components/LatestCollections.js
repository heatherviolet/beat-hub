import React from 'react'
import Collection from '../components/profile/collection';
import {  Card } from "react-bootstrap";



export default function LatestCollections({ collections }) {
  return (
    <>

        { collections ? (
            <div className='collections-container'>
                <h1>Check Out The Latest Collections!</h1>
                {collections?.map((collection, i)=> (
                    <Collection key={i} collection={collection} />
                ))}
            </div>

            ) : ( <div>there are no collections in database </div> )
        }

    </>
  )
}