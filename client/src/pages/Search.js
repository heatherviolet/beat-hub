import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { searchSpotify } from "../utils/API";
import {WRITE_REVIEW} from '../utils/mutations'

import SearchAlbums from "../components/SearchAlbums";

export default function Search() {
  const [searchedAlbums, setSearchedAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
  const [albumReviewId, setAlbumReviewId] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [addedReview, {error}] = useMutation(WRITE_REVIEW);

  const toggleReviewModal = () => setReviewModal(currentState => !currentState);

  const addReview = async () => {
    const review = addedReview(albumReviewId, reviewText, )
    console.log('trying to add review for : ', albumReviewId);
    console.log(reviewText);
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchSpotify(searchInput);
      if (!response) {
        throw new Error("something went wrong!");
      }

      const { data } = response;

      const albumData = data.albums.items.map((album) => ({
        albumURI: album.data.uri,
        albumId: album.data.uri.split(":")[2],
        name: album.data.name,
        artists: album.data.artists || "Artist unknown",
        cover: album.data.coverArt.sources[0].url || "no cover art",
        year: album.data.date.year,
      }));

      setSearchedAlbums(albumData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <>

      <Modal show={reviewModal} onHide={toggleReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add your review below!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={reviewText} onChange={e=> setReviewText(e.target.value)}></input>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleReviewModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addReview}>
            Add Review
          </Button>
        </Modal.Footer>
      </Modal>
    <div id="search-page">
      <div>
        <Form className="form" onSubmit={handleFormSubmit}>
          <Form.Group className="searchForm mb-3" controlId="formBasicSearch">
            <Form.Label>Album Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search for an album name..."
              name="searchInput"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button
              variant="secondary"
              type="submit"
              className="button py-2 my-3"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
        <div id="under-form"></div>
      </div>

      <div id="album-container">
        {searchedAlbums.length
          ? searchedAlbums.map((album, i) => {
              return <SearchAlbums key={i} album={album} id={album.albumId} setAlbumReviewId={setAlbumReviewId} toggleReviewModal={toggleReviewModal}/>;
            })
          : ""}
      </div>
    </div>
    </>
  );
}
