import React, { useState } from 'react'

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { ADD_ALBUM, ADD_FAVORITE } from '../utils/mutations';

import { QUERY_ME, FIND_ALBUM } from '../utils/queries';

import { useQuery, useMutation } from '@apollo/client'

import { Link, Redirect } from 'react-router-dom';

import Auth from '../utils/auth';

export default function SearchAlbums({ album }) {

    const [responseAddTo, setResponseAddTo] = useState(false);

    const { loadingAlbum, data, refetch } = useQuery(FIND_ALBUM, {
        variables: { albumId: album.albumId }
    });

    const [addAlbum, { albumError }] = useMutation(ADD_ALBUM);
    const [addFavorite, { favoriteError }] = useMutation(ADD_FAVORITE);

    const cacheAlbum = async (action) => {
        // add the album to our database
        try {
            if (!data.findAlbum) {
                await addAlbum({
                    variables: {
                        name: album.name,
                        albumId: album.albumId,
                        artists: album.artists.items.map(data => data.profile.name),
                        cover: album.cover,
                        year: album.year
                    }
                }).then(promise => {
                    if (action === 'favorite') {
                        addToFavorites(promise.data.addAlbum._id).then(refetch())
                    }

                    if (action === 'addTo') {
                        setResponseAddTo(true);
                    }
                })
            } else {
                if (action === 'favorite') {
                    addToFavorites(data?.findAlbum?._id).then(refetch());
                }

                if (action === 'addTo') {
                    setResponseAddTo(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const addToFavorites = async (id) => {
        try {
            await addFavorite({
                variables: { id: id }
            }).then(console.log('Added to favorites!'))
        } catch (err) {
            console.error(err)
        }
    }

    if (responseAddTo) {
        refetch();
        return <Redirect to={`/addto/${album.albumId}`} />
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
                        return profile.profile.name + ' '
                    })}
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
                {Auth.loggedIn() ? (
                    <>
                        <Card.Link href={album.albumURI}>Check It Out on Spotify</Card.Link>
                        <ListGroup>
                            <ListGroupItem>
                                <Button className="btn btn-danger" 
                                        onClick={() => cacheAlbum('favorite')}
                                        >Favorite</Button>
                                <Button className="btn btn-success" 
                                        onClick={() => cacheAlbum('addTo')}
                                        >Add to...
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </>
                ) : (
                    <h3>Login to to use BeetHub!</h3>
                )}
                
            </Card.Body>
        </Card>
    )
}