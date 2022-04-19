import React, { useState } from 'react'

import Auth from '../utils/auth';

// query user data via apollo client
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

import { Redirect } from 'react-router-dom';

import Collection from '../components/profile/collection';

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  const [selectedNav, setSelectedNav] = useState("Collections");

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
                <h1>Collections</h1>
                <div className="d-flex flex-wrap justify-content-around">
                  {user.collections.map((collection, i) => {
                    return <Collection key={i} collection={collection}/>
                  })}
                </div>
              </>
            ) : (selectedNav === 'Reviews') ? (
              <>
                <h1>Reviews</h1>
                {user.reviews.map((review, i) => {
                  return <h1></h1>
                })}
              </>
            ) : (
              <>
                <h1>Favorites</h1>
                {user.favorites.map((favorite, i) => {
                  return <h1></h1>;
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
