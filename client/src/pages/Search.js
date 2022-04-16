import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { searchSpotify } from "../utils/API";
import { COLLECT_ALBUM } from "../utils/mutations"
import { saveAlbumIdsLocal, getSavedAlbumIdsFromLocal } from '../utils/localStorage';

export default function Search() {

  const searchSpotifyAlbums = () => {
    // create state for holding returned spotify api data
    const [searchedAlbums, setSearchedAlbums] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
  
    // create state to hold saved albumId values
    const [savedAlbumIds, setSavedAlbumIds] = useState(getSavedAlbumIds());
  
    // set up useEffect hook to save `savedAlbumIds` list to localStorage on component unmount

    useEffect(() => {
      return () => saveAlbumIdsLocal(savedAlbumIds);
    });
  
    // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      if (!searchInput) {
        return false;
      }
  
      try {
        const response = await searchSpotify(searchInput);
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const { albums } = await response.json();
  
        const albumData = albums.items.map((album) => ({
          albumId: album.data.uri.split(":")[2],
          name: album.data.name,
          artists: album.data.artists || "Artist unknown",
          cover: album.data.coverArt.sources[0].url || "no cover art",
          year: album.data.date.year,
        }));
  
        setSearchedAlbums(albumData);
        setSearchInput('');
      } catch (err) {
        console.error(err);
      }
    };
  
    const [collectAlbum] = useMutation(COLLECT_ALBUM);
  
    // create function to handle saving a book to our database
    const handleSaveBook = async (bookId) => {
      // find the book in `searchedAlbums` state by the matching id
      const bookToSave = searchedAlbums.find((book) => book.bookId === bookId);
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        await saveBook({
          variables: {...bookToSave},
        });
  
        // if book successfully saves to user's account, save book id to state
        setSavedBookIds([...savedBookIds, bookToSave.bookId]);
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <>
      <Form className="form">
        <Form.Group className="searchForm mb-3" controlId="formBasicSearch">
          <Form.Label>Album Search</Form.Label>
          <Form.Control type="text" placeholder="Search for an album name..." />
          <Button
            variant="secondary"
            type="submit"
            className="button py-2 my-3"
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
