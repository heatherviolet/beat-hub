import React from 'react'

export default function AlbumMini({ name, cover }) {
    return (
        <div className="album-mini" style={{maxWidth: '300px', margin: "20px"}}>
            <div>
                <img src={cover}/>
            </div>
            <div>
                <h3 style={{margin: "10px 10px"}}>{name}</h3>
            </div>
        </div>
    );
}