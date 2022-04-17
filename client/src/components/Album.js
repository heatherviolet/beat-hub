import React from 'react'
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Album( {album, i} ) {
  return (
    <Card key={i} style={{ width: "18rem" }}>
      <Card.Img variant="top" src={album.cover} />
      <Card.Body>
        <Card.Title>{album.name}</Card.Title>
        <Card.Text>{album.year}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{album.artists.items.map((data) => {
          return data.profile.name
        })}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href={'https://open.spotify.com/album/'+album.albumId.trim()} target='_blank'>Check It Out on Spotify</Card.Link>
      </Card.Body>
    </Card>
  )
}