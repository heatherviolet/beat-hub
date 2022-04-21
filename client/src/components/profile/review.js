import React from 'react';

import { Link } from 'react-router-dom';

import { FIND_ALBUM } from '../../utils/queries';

import { useQuery } from '@apollo/client';

export default function Review({ review }) {

    const { data, loading } = useQuery(FIND_ALBUM, {
        variables: { albumId: review.albumId }
    });

    const image = data?.findAlbum?.cover;
    const name = data?.findAlbum?.name;

    return (
        <div className="d-flex reviews" style={{maxWidth: "500px", margin: "30px 0px"}}>
            <Link to={`/album/${review.albumId}`}>
                <div>
                    <img width="150px" height="150px" src={image}></img>
                </div>
            </Link>
            <div style={{margin: "0px 20px", color: "#F1F2EE"}}>
                <h4>{name}</h4>
                {review.author && 
                    <Link to={`/profile/${review.author}`}>
                        <p style={{color: 'white'}}>By: <i>{review.author}</i></p>
                    </Link>
                }
                <p>
                    Rating: <i style={{display: "block"}} className={(review.rating > 2) ? 'good' : 'bad'}>{review.rating}/5</i>
                </p>
                <i>
                    <p className="revBody">
                        {review.body}
                    </p>
                </i>
            </div>
        </div>
    );
}