import React from 'react';

import { Link } from 'react-router-dom';

export default function Favorite({ favorite }) {
    return (
        <Link to={`/album/${favorite.albumId}`}>
            <img src={favorite.cover}/>
        </Link>
    );
}