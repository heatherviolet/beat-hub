import React, { useState } from 'react'

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { ADD_ALBUM, ADD_FAVORITE } from "../utils/mutations";

import { QUERY_ME, FIND_ALBUM } from "../utils/queries";

import { useQuery, useMutation } from '@apollo/client'

import { Link, Redirect } from 'react-router-dom';

import Auth from "../utils/auth";

export default function SearchAlbums({ album, id }) {

    const [responseAddTo, setResponseAddTo] = useState(false);
    const [responseView, setResponseView] = useState(false);

    const { loadingAlbum, data, refetch } = useQuery(FIND_ALBUM, {
        variables: { albumId: album.albumId }
    });

    const {loading:meLoading, data:meData} = useQuery(QUERY_ME);

    const addToFavorites = async (id) => {
      try {
          await addFavorite({
              variables: { id: id }
          }).then(console.log('Added to favorites!'))
      } catch (err) {
          console.error(err)
      }
    }

    const [addAlbum, { albumError }] = useMutation(ADD_ALBUM);
    const [addFavorite, { favoriteError }] = useMutation(ADD_FAVORITE);
    const [addReview, { error }] = useMutation(ADD_REVIEW);

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

                    if (action === 'view') {
                        setResponseView(true);
                    }
                })
            } else {
                if (action === 'favorite') {
                    addToFavorites(data?.findAlbum?._id).then(refetch());
                }

                if (action === 'addTo') {
                    setResponseAddTo(true);
                }

                if (action === 'view') {
                    setResponseView(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    let idExists = false;

    const favorites = !meLoading && meData.me.favorites;
  

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].albumId !== id) {
        } else {
            idExists = true;
        }
    }

    if (responseAddTo) {
        refetch();
        return <Redirect to={`/addto/${album.albumId}`} />
    }

    if (responseView) {
        refetch();
        return <Redirect to={`/album/${album.albumId}`} />
    }
    
    return (
        <Card className="albumCard d-flex align-align-content-end">
            <Card.Img   className="point"
                        variant="top" 
                        src={album.cover} 
                        alt={album.name}
                        onClick={() => cacheAlbum('view')} />
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
                            <div>{idExists && "One of your Favorites"}</div>
                                {!idExists && <Button className="btn btn-danger" 
                                        onClick={() => cacheAlbum('favorite')}
                                        >Favorite</Button>}
                                <Button className="btn btn-success" 
                                        onClick={() => cacheAlbum('addTo')}
                                        >Add to...
                                </Button>
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
