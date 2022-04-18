import React, { useState } from "react";

import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { FIND_ALBUM } from "../utils/queries";
import { ADD_ALBUM, ADD_FAVORITE } from "../utils/mutations";

import { QUERY_ME } from "../utils/queries";

import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";

export default function SearchAlbums({ album, id }) {
  const { loadingAlbum, dataAlbum } = useQuery(FIND_ALBUM, {
    variables: { albumId: album.albumId },
  });

  const { loading, data } = useQuery(QUERY_ME);

  const me = data?.me;

  const [addAlbum, { albumError }] = useMutation(ADD_ALBUM);
  const [addFavorite, { favoriteError }] = useMutation(ADD_FAVORITE);
  const [albumId, setAlbumId] = useState([]);

  const cacheAlbum = async () => {
    // add the album to our database
    try {
      const promise = await addAlbum({
        variables: {
          name: album.name,
          albumId: album.albumId,
          artists: album.artists.items.map((data) => data.profile.name),
          cover: album.cover,
          year: album.year,
        },
      });

      return promise.data.addAlbum._id;
    } catch (err) {
      console.log(err);
    }
  };

  const addToFavorites = async (id) => {
    try {
      // const { favorites } = await data;
      // console.log(...favorites)
      await addFavorite(
        {
          variables: { id: id },
          // onCompleted: (id) => setAlbumId(...favorites ,id)
        },
        id
      );
    } catch (err) {
      console.error(err);
    }
  };

  const favorites = !loading && data.me.favorites;
  let idExists = false;
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].albumId !== id) {
    } else {
      idExists = true;
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
            return profile.profile.name + " ";
          })}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        {Auth.loggedIn() ? (
          <>
            <Card.Link href={album.albumURI}>Check It Out on Spotify</Card.Link>
            <ListGroup>
              <ListGroupItem>
              <div>{!loading && idExists && "You already favorited this"}</div>
                <Button
                  className="btn btn-danger"
                  onClick={() => {
                    cacheAlbum().then(addToFavorites);
                  }}
                  id={id}
                >
                  Favorite
                </Button>
              </ListGroupItem>
            </ListGroup>
          </>
        ) : (
          <h3>Login to to use BeetHub!</h3>
        )}
      </Card.Body>
    </Card>
  );
}
