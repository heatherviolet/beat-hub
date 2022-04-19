import React, { useState } from 'react';

import { FIND_ALBUM } from '../utils/queries';
import { WRITE_REVIEW } from '../utils/mutations'

import { useQuery, useMutation } from '@apollo/client';

import { useParams } from 'react-router-dom';

import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";

export default function Album() {
    const { albumId: albumId } = useParams();
    const [score, setScore] = useState('Score');
    const [body, setBody] = useState('');
    const [writeReview, { error }] = useMutation(WRITE_REVIEW);

    console.log(albumId);

    const { loading, data, refetch } = useQuery(FIND_ALBUM, {
        variables: { albumId: albumId }
    })

    const album = data?.findAlbum;

    console.log(album);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (body !== '' && score !== 'Score') {
            console.log(score);
            console.log(body)

            await writeReview({
                variables: { albumId: albumId, body: body, rating: score}
            }).then(() => {
                setScore('Score');
                setBody('');
                refetch();
            })
        }
        
    }

    return (
        <div className="mx-auto">
            <div>
                <div className="albumWrap d-flex flex-wrap">
                    <img width="300px" height="300px" src={album?.cover}></img>
                    <div style={{margin: '10px 20px', marginRight: '100px'}}>
                        <h2>{album?.name}</h2>
                        {album?.artists?.map((artist, i) => {
                            return <h4 key={i}>{artist}</h4>
                        })}
                        {(album?.reviews?.length > 0) ? (
                            <h4>Rating: {album?.averageRating}/5</h4>
                        ) : (
                            <h4>Rating: N/A</h4>
                        )}
                        
                    </div>
                </div>
            </div>
            <div style={{marginTop: '20px'}} className="reviewForm">
                <h4>Share your thoughts!</h4>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={`${score}`}
                            id="input-group-dropdown-1" 
                            style={{paddingBottom: '10px'}}
                            className={(score !== 'Score') ? ((score > 2) ? 'good' : 'bad') : ( null )}>
                            <Dropdown.Item onClick={() => setScore(0)}>0</Dropdown.Item>
                            <Dropdown.Item onClick={() => setScore(1)}>1</Dropdown.Item>
                            <Dropdown.Item onClick={() => setScore(2)}>2</Dropdown.Item>
                            <Dropdown.Item onClick={() => setScore(3)}>3</Dropdown.Item>
                            <Dropdown.Item onClick={() => setScore(4)}>4</Dropdown.Item>
                            <Dropdown.Item onClick={() => setScore(5)}>5</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control
                            value={body}
                            as="textarea"
                            placeholder="Write your review here!"
                            style={{ height: '100px' }}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <Button type="submit" style={{marginTop: '20px'}}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}