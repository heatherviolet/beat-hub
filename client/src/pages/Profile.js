import React from 'react'

import Auth from '../utils/auth';

// query user data via apollo client
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

import { Redirect } from 'react-router-dom';

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);

  // check if the data exists before accessing it
  const user = data?.me

  // redirect to login if the user tries to view the profile and they're not logged in
  if (!Auth.loggedIn()) {
    return <Redirect to='/login'/>
  }

  console.log(user)

  return (
    // conditionally render the user profile
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Welcome, {user.username}</h1>
          <div>
            
          </div>
        </div>
      )}
    </>
  )
}
