import React from 'react'

import { useParams } from 'react-router-dom';

import { GET_COLLECTION } from '../utils/queries';

import { useQuery } from '@apollo/client';

import AlbumMini from '../components/AlbumMini';

export default function Collection() {
    const { id: id } = useParams();

    const { loading, data: collData } = useQuery(GET_COLLECTION, {
        variables: { id: id }
    });

    const collection = collData?.getCollection;

    return (
        <div className="mx-auto" style={{maxWidth: '1200px', paddingBottom: '120px'}}>
            <h1>{collection?.name}</h1>
            <div className="d-flex flex-wrap justify-content-around">
                {collection?.albumCollection?.map((album, i) => {
                    return <AlbumMini key={i} name={album.name} cover={album.cover}/>
                })}
            </div>
        </div>
    );
}