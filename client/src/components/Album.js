import React from 'react'

export default function Album( {album} ) {
  return (
    <div >
        <p>album: {album.data.name}</p>
        <p>artist: {album.data.artists.items[0].profile.name}</p>
        <img 
            src={album.data.coverArt.sources[0].url}
            key={album.data.name}
            alt={album.data.name}
        ></img>
    </div>
  )
}
