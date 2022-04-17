import React from 'react'

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { FIND_ALBUM } from '../utils/queries';

import { useQuery } from '@apollo/client';

export default function SearchAlbums({ album, i }) {

    // query if the album exists
    const { loading, data } = useQuery(FIND_ALBUM, {
        variables: { albumId: album.albumId }
    })

    // grab the data
    const exists = data?.findAlbum

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={album.cover} />
            <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.year}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{album.artists.items.map((profile) => {
                    return profile.name
                })}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href={album.albumURI}>Check It Out on Spotify</Card.Link>
                <Button className="btn btn-primary" onClick={() => addToFavorites()}>Button</Button>
            </Card.Body>
        </Card>
    )
}