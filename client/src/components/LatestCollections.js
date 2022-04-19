import React from 'react'
import Collection from '../components/Collection'
import {  Card } from "react-bootstrap";



export default function LatestCollections({collections}) {
  return (
    <>

      { collections ? (

        <Card className='collections-container'>
          {collections.map(collection=> (
            <div className='collection-container'>
              <img href=" " />
              <Collection key={collection._id} />
            </div>
          ))}
        </Card>

      ) : (

        <div>there are no collections in database </div>

      )}

    </>
  )
}
