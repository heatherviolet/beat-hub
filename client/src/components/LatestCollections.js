import React from 'react'
import Collection from '../components/profile/collection';

export default function LatestCollections({ collections }) {
  return (
    <>

        { collections ? (
            <div>
                <h1>Check Out The Latest Collections By Others!</h1>
                <div className='collections-container'>
                  {collections?.slice(0).reverse().map((collection, i)=> (
                      <Collection key={i} collection={collection} />
                  ))}
                </div>
            </div>

            ) : ( <div>there are no collections in database </div> )
        }

    </>
  )
}