import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { searchSpotify } from "../utils/API";

import SearchAlbums from '../components/SearchAlbums';

export default function Search() {
  const [searchedAlbums, setSearchedAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

      const { data } = response

      const albumData = data.albums.items.map((album) => ({
        albumURI: album.data.uri,
        albumId: album.data.uri.split(":")[2],
        name: album.data.name,
        artists: album.data.artists || "Artist unknown",
        cover: album.data.coverArt.sources[0].url || "no cover art",
        year: album.data.date.year,
      }));

      setSearchedAlbums(albumData);
      console.log(albumData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
      <div>
        {searchedAlbums.length ? searchedAlbums.map((album, i) => {
          console.log(album)
          return <SearchAlbums key={i} album={album}/>
        }) : ""}
      </div>
    </>
  );
}
