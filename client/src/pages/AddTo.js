import React from 'react'

import Auth from '../utils/auth';

// query user data via apollo client
import { useQuery } from '@apollo/client';

import { QUERY_ME, FIND_ALBUM } from '../utils/queries';

import { Redirect, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import CollPrev from '../components/CollPrev';

export default function AddTo() {
    const { albumId: albumId } = useParams();

    const { loading, data: meData } = useQuery(QUERY_ME, {
        pollInterval: 500
    });

    const { loadingAlbum, data: albumData, refetch } = useQuery(FIND_ALBUM, {
        variables: { albumId: albumId },
        pollInterval: 300
    });

    // check if the data exists before accessing it
    const user = meData?.me;

    // get the ID from the album if it exists
    const id = albumData?.findAlbum?._id;

    if (!Auth.loggedIn) {
        return <Redirect to='/login'/>
    }

    return (
        <div className='mx-auto' style={{maxWidth: '1200px'}}>
            <h1>Add to...</h1>
            <div className="d-flex flex-wrap justify-content-around">
                {user?.collections.length ? (
                    user?.collections.map((collection, i) => {
                        return <CollPrev key={i} collection={collection} _id={id} />
                    }
                ).reverse()) : (
                    <>
                        <div style={{display: 'block'}}>
                            <Link to={`/addcol/${albumId}`}>
                                <h2>Add your first collection!</h2>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}