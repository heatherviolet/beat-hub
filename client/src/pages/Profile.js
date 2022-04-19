import React, { useState } from 'react'

import Auth from '../utils/auth';

import { Form, Button } from "react-bootstrap";

// query user data via apollo client
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

import { Redirect, Link } from 'react-router-dom';

import { CREATE_COLLECTION } from '../utils/mutations';

import { useMutation } from '@apollo/client';

import Review from '../components/profile/review';
import Collection from '../components/profile/collection';
import Favorite from '../components/profile/favorite';

export default function Profile() {
  const [fetched, setFetched] = useState(false);
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [selectedNav, setSelectedNav] = useState("Collections");

  // check if the data exists before accessing it
  const user = data?.me

  // redirect to login if the user tries to view the profile and they're not logged in
  if (!Auth.loggedIn()) {
    return <Redirect to='/login'/>
  }

  const select = (value) => {
    setSelectedNav(value);
  };

  // not perfect, but more performance friendly refetch solution
  if (!fetched) {
    setTimeout(() => {
      refetch();
    }, 100)
    setFetched(true);
  }

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
                <Link to="/addcollection">
                  <div align="center" className="d-block mx-auto">
                    <p className="btn selectedProfileNav">Add Collection</p>
                  </div>
                </Link>
                <div className="d-flex flex-wrap justify-content-around">
                  {user.collections.map((collection, i) => {
                    return <Collection key={i} collection={collection}/>
                  }).reverse()}
                </div>
              </>
            ) : (selectedNav === 'Reviews') ? (
              <>
                <h1 align="center">Reviews</h1>
                {user.reviews.map((review, i) => {
                  return <Review key={i} review={review}/>
                }).reverse()}
              </>
            ) : (
              <>
                <h1 align="center">Favorites</h1>
                <div className="d-flex flex-wrap justify-content-around">
                  {user.favorites.map((favorite, i) => {
                    return <Favorite key={i} favorite={favorite}/>
                  }).reverse()}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
