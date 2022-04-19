import React from 'react';

import { FIND_ALBUM } from '../utils/queries';

import { useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';

import { Form, Button } from "react-bootstrap";

export default function Album() {
    const { albumId: albumId } = useParams();

    console.log(albumId);

    const { loading, data } = useQuery(FIND_ALBUM, {
        variables: { albumId: albumId }
    })

    const album = data?.findAlbum;

    return (
        <div className="mx-auto">
            <div>
                <div className="albumWrap d-flex flex-wrap">
                    <img width="300px" height="300px" src={album?.cover}></img>
                    <div style={{margin: '10px 20px'}}>
                        <h2>{album?.name}</h2>
                        {album?.artists?.map((artist, i) => {
                            return <h4 key={i}>{artist}</h4>
                        })}
                        {album?.reviews?.length ? (
                            <h4>Rating: {album?.averageRating}/5</h4>
                        ) : (
                            <h4>Rating: N/A</h4>
                        )}
                        
                    </div>
                </div>
            </div>
            <div>
                <Form>
                    <Form.Group className="mb-3">
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}