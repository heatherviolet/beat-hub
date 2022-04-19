import React from 'react'
import {  Card } from "react-bootstrap";



export default function LatestCollections({ collections }) {
  return (
    <>

        { collections ? (
            <Card className='collections-container'>
                {collections?.map(collection=> (
                    <Card key={collection?._id}>
                        <h1>{collection?.name}</h1>
                    </Card>
                ))}
            </Card>

            ) : ( <div>there are no collections in database </div> )
        }

    </>
  )
}