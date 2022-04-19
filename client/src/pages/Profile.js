import React, { useState } from 'react'

import Auth from '../utils/auth';

import { Form, Button } from "react-bootstrap";

// query user data via apollo client
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

import { Redirect } from 'react-router-dom';

import { CREATE_COLLECTION } from '../utils/mutations';

import { useMutation } from '@apollo/client';

import Review from '../components/profile/review';
import Collection from '../components/profile/collection';
import Favorite from '../components/profile/favorite';

export default function Profile() {
  const [nameInput, setNameInput] = useState("");
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [selectedNav, setSelectedNav] = useState("Collections");

  const [createCollection, { createErr }] = useMutation(CREATE_COLLECTION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (nameInput) {
        await createCollection({
            variables: { name: nameInput }
        }).then(setNameInput(""));

        refetch();
    }
  };

  // check if the data exists before accessing it
  const user = data?.me

  console.log(user)

  // redirect to login if the user tries to view the profile and they're not logged in
  if (!Auth.loggedIn()) {
    return <Redirect to='/login'/>
  }

  const select = (value) => {
    setSelectedNav(value);
  };

  return (
    // conditionally render the user profile
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mx-auto" style={{maxWidth: '1200px', paddingBottom: '120px'}}>
          <div className="d-flex justify-content-center">
            <div>
            <h1>Welcome, {user.username}</h1>
              <span className="profile-nav" style={{
                            display: 'flex', 
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            margin: '10px 0',
                            padding: '10px',
                            color: '#F1F2EE',
                            backgroundColor: '#282c34',
                            borderRadius: '30px',
                            maxWidth: '400px'
                          }}>
                <p onClick={() => select('Collections')} className={selectedNav === 'Collections' ? "selectedProfileNav" : ""}>
                  Collections
                </p>
                <p onClick={() => select('Reviews')} className={selectedNav === 'Reviews' ? "selectedProfileNav" : ""}>
                  Reviews
                </p>
                <p onClick={() => select('Favorites')} className={selectedNav === 'Favorites' ? "selectedProfileNav" : ""}>
                  Favorites
                </p>
              </span>
              </div>
            </div>
          <div>
            {selectedNav === 'Collections' ? (
              <>
                <h1 align="center">Collections</h1>
                <Form className="form mx-auto" onSubmit={handleFormSubmit}>
                  <Form.Group className="searchForm mb-3">
                      <Form.Label>Collection name:</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Name your collection"
                          onChange={(e) => setNameInput(e.target.value)}
                          value={nameInput}
                      />
                      <Button
                          variant="secondary"
                          type="submit"
                          className="button py-2 my-3">
                          Submit
                      </Button>
                  </Form.Group>
                </Form>
                <div className="d-flex flex-wrap justify-content-around">
                  {user.collections.map((collection, i) => {
                    return <Collection key={i} collection={collection}/>
                  })}
                </div>
              </>
            ) : (selectedNav === 'Reviews') ? (
              <>
                <h1 align="center">Reviews</h1>
                {user.reviews.map((review, i) => {
                  return <Review review={review}/>
                })}
              </>
            ) : (
              <>
                <h1 align="center">Favorites</h1>
                <div className="d-flex flex-wrap justify-content-around">
                  {user.favorites.map((favorite, i) => {
                    return <Favorite key={i} favorite={favorite}/>
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
