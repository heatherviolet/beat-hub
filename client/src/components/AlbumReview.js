import React from 'react'
import Album from './Album'
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";


export default function AlbumReview() {

  // grabs  users reviews

  // displays users reviews
  return (
    <>
      <Card>
        {/* <Album album={album} key={album.data.uri}/> */}
        <div>Username</div>
        <div>Album Review</div>
      </Card>
      
    </>
  )
}