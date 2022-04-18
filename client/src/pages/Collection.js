import React from 'react'

import { useParams } from 'react-router-dom';

import { GET_COLLECTION } from '../utils/queries';

import { useQuery } from '@apollo/client';

import AlbumMini from '../components/AlbumMini';

export default function Collection() {
    const { id: id } = useParams();

    const { loading, data: collData, refetch } = useQuery(GET_COLLECTION, {
        variables: { id: id }
    });

    const collection = collData?.getCollection;

    refetch();

    return (
        <div className="mx-auto" style={{maxWidth: '1200px', paddingBottom: '120px'}}>
            <h1>{collection?.name}</h1>
            <div className="d-flex flex-wrap justify-content-around">
                {collection?.albumCollection.length ? (
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