import React from 'react';

import { Link } from 'react-router-dom';

export default function Favorite({ favorite }) {
    return (
        <Link to={`/album/${favorite.albumId}`}>
            <img width="300" height="300" src={favorite.cover} style={{padding: "5px"}}/>
        </Link>
    );
}