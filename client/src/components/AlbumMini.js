import React from 'react'

import { Link } from 'react-router-dom';

export default function AlbumMini({ name, cover, albumId }) {
    return (
        <Link to={`/album/${albumId}`}>
            <div className="album-mini" style={{maxWidth: '300px', margin: "20px"}}>
                <div>
                    <img width="300" height="300" src={cover}/>
                </div>
                <div>
                    <h3 style={{margin: "10px 10px"}}>{name}</h3>
                </div>
            </div>
        </Link>
    );
}