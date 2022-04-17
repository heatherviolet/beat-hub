import React from 'react'

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { FIND_ALBUM } from '../utils/queries';
import { ADD_ALBUM } from '../utils/mutations';

import { useQuery, useMutation } from '@apollo/client';

export default function SearchAlbums({ album }) {

    // query if the album exists
    const { loading, data } = useQuery(FIND_ALBUM, {
        variables: { albumId: album.albumId }
    })

    // grab the data
    const exists = data?.findAlbum

    const [addAlbum, { error }] = useMutation(ADD_ALBUM);

    const addToFavorites = async (album) => {
            try {
                // add the album to our database
                await addAlbum({
                    variables: {
                        name: album.name,
                        albumId: album.albumId,
                        artists: album.artists.items.map(data => data.profile.name),
                        cover: album.cover,
                        year: album.year
                    }
                })
            } catch (err) {
                console.log('This album already exists!')
            }

    }

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={album.cover} />
            <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.year}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    {album.artists.items.map((profile) => {
                        return profile.profile.name
                    })}
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href={album.albumURI}>Check It Out on Spotify</Card.Link>
                <Button className="btn btn-primary" onClick={() => addToFavorites(album)}>Button</Button>
            </Card.Body>
        </Card>
    )
}