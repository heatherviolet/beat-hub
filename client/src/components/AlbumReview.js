import React from 'react'
import { Card } from "react-bootstrap";


export default function AlbumReview( {review} ) {

  return (
    <>
      <Card>
        <p>{review?.body}</p>
      </Card>
      
    </>
  )
}