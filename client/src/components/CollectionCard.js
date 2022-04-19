import React from 'react'
import AlbumMini from './AlbumMini'

export default function CollectionCard({ collection }) {
    return (
        <div className="mx-auton collection-card" style={{maxWidth: '1200px', paddingBottom: '120px'}}>
            <h3 className='collection-card-header'>{collection?.name}</h3>
            <div className="d-flex flex-wrap justify-content-around">
                {collection ? (
                    collection?.albumCollection?.map((album, i) => {
                        return <AlbumMini key={i} name={album.name} cover={album.cover}/>
                    }).reverse()
                ) : (
                    <h3>No albums yet.</h3>
                )}
                
            </div>
        </div>
    );
}