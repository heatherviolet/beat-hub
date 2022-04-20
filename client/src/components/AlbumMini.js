import React from 'react'

import { Link } from 'react-router-dom';

export default function AlbumMini({ name, cover, albumId }) {
    return (
        <Link to={`/album/${albumId}`}>
            <div className="album-mini">
                <div className="album-mini-img-con">
                    <img className="album-mini-image" src={cover}/>
                </div>
                <div>
                    <h3 style={{padding: "10px 10px"}}>{name}</h3>
                </div>
            </div>
        </Link>
    );
}