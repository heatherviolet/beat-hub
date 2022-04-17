import React from 'react'

import Auth from '../utils/auth';

// query user data via apollo client
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me

  console.log(user)

  return (
    // conditionally render the user profile
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Welcome, {user.username}</h1>
        </div>
      )}
    </>
  )
}
