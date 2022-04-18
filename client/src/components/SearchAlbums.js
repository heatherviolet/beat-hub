import React from 'react'

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { ADD_ALBUM, ADD_FAVORITE, ADD_REVIEW } from '../utils/mutations';

import { QUERY_ME, FIND_ALBUM } from '../utils/queries';

import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';

export default function SearchAlbums({ album }) {
    const { loadingAlbum, data, refetch } = useQuery(FIND_ALBUM, {
        variables: { albumId: album.albumId }
    });

    console.log(data?.findAlbum);

    const [addAlbum, { albumError }] = useMutation(ADD_ALBUM);
    const [addFavorite, { favoriteError }] = useMutation(ADD_FAVORITE);
    const [addReview] = useMutation(ADD_REVIEW);

    const cacheAlbum = async () => {
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
                    addToFavorites(promise.data.addAlbum._id).then(refetch())
                })
            } else {
                addToFavorites(data?.findAlbum?._id).then(refetch());
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

    const reviewAlbum = async (id) => {
        try {
            await addReview({
                variables: { id: id }
            }).then(console.log('Added review!'))
        } catch (err) {
            console.error(err)
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
                                        onClick={() => { cacheAlbum() }}
                                        >Favorite</Button>
                            </ListGroupItem>
                        </ListGroup>
                        <ListGroup>
                            <ListGroupItem>
                                <Button className="btn btn-danger" 
                                        onClick={() => { reviewAlbum() }}
                                        >Review</Button>
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