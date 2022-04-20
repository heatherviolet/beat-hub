import React from 'react'
import Collection from '../components/profile/collection';

export default function LatestCollections({ collections }) {
  return (
    <>

        {collections.length ? (
            <div>
                <h1 align="center">Check Out The Latest Collections By Others!</h1>
                <div className='collections-container'>
                  {collections?.map((collection, i)=> (
                      <Collection key={i} collection={collection} />
                  )).reverse().slice(0, 4)}
                </div>
            </div>

            ) : ( <h1>There are not enough collections in the database...</h1> )
        }

    </>
  )
}