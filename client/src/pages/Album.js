import React, { useState } from 'react';

import Auth from '../utils/auth';

import { FIND_ALBUM, QUERY_ME } from '../utils/queries';
import { WRITE_REVIEW, ADD_FAVORITE } from '../utils/mutations'

import { useQuery, useMutation } from '@apollo/client';

import { useParams, Redirect, Link } from 'react-router-dom';

import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";

export default function Album() {
    const { albumId: albumId } = useParams();
    const [score, setScore] = useState('Score');
    const [body, setBody] = useState('');
    const [writeReview, { error }] = useMutation(WRITE_REVIEW);
    const [addFavorite, { error: favError }] = useMutation(ADD_FAVORITE);
    const { loading: meLoading, data: meData, refetch: refetchMe } = useQuery(QUERY_ME);

    const { loading, data, refetch } = useQuery(FIND_ALBUM, {
        variables: { albumId: albumId }
    })

    const album = !loading && data?.findAlbum;

    const _id = !loading && data?.findAlbum?._id

    if (!Auth.loggedIn()) {
        return <Redirect to='/login'/>
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            if (body !== '' && score !== 'Score') {

                await writeReview({
                    variables: { albumId: albumId, body: body, rating: score }
                }).then(() => {
                    setScore('Score');
                    setBody('');
                    refetch();
                    refetchMe();
                })
            }
        } catch (err) {
            console.error(err);
        }
        
    }

    let reviewExists = false;
    const userReviews = !meLoading && meData.me.reviews;

    let idExists = false;
    const favorites = !meLoading && meData.me.favorites;
  

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].albumId !== albumId) {
        } else {
            idExists = true;
        }
    }

    for (let i = 0; i < userReviews.length; i++) {
        if (userReviews[i].albumId === albumId) {
            reviewExists = true;
        }
    }

    const handleAddFav = async () => {
        try {
            await addFavorite({
                variables: { id: _id }
            }).then(console.log('Added to favorites!'))
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mx-auto" style={{maxWidth: "500px", paddingBottom: '120px'}}>
            <div>
                <div className="albumWrap d-flex flex-wrap">
                    <img width="300px" height="300px" src={album?.cover} className="mx-auto"></img>
                    <div style={{margin: '10px 20px', width: '100%'}}>
                        <div style={{paddingRight: '100px'}}>
                            <h2>{album?.name}</h2>
                            <h4 style={{marginTop: '20px'}}>Artists:</h4>
                            {album?.artists?.map((artist, i) => {
                                return <i key={i}>{artist}</i>
                            })}
                            <div style={{marginTop: '20px'}}>
                                <a target="_blank" href={`https://open.spotify.com/album/${albumId}`}>Check it out on Spotify!</a>
                            </div>
                            <div style={{marginTop: '20px'}}>
                                {(album?.reviews?.length) ? (
                                    <h4>Average Score: <i className={(album?.averageRating > 2) ? 'good' : 'bad'}>{album?.averageRating}/5</i></h4>
                                ) : (
                                    <h4>Average Score: N/A</h4>
                                )}
                            </div>
                        </div>
                        <div className="row mx-auto" style={{marginTop: '20px'}}>
                            {!idExists && 
                                <button onClick={() => handleAddFav()} className="btn btn-danger col">Favorite</button>
                            }
                            <Link className="col" style={{textDecoration: "none", color: "white", padding: "0px"}} to={`/addTo/${albumId}`}>
                                <button className="btn btn-success" style={{width: '100%'}}>
                                    Add to...
                                </button>
                            </Link>
                        </div>
                    </div> 
                </div>
            </div>
            {!reviewExists && <div style={{marginTop: '20px'}} className="reviewForm">
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
                            style={{ height: '100px', resize: 'none' }}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <Button type="submit" style={{marginTop: '20px'}}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </div>}
            <div>
                {album?.reviews?.map((review, i) => {
                    return (
                        <div key={i} className="reviews">
                            <Link to={`/profile/${review.author}`}>
                                <h3>{review.author}</h3>
                            </Link>
                            <p>Rating: <i className={(review.rating > 2) ? 'good' : 'bad'}>{review.rating}/5</i></p>
                            <i><p className="revBody">{review.body}</p></i>
                        </div>
                    )
                }).reverse()}
            </div>
        </div>
    );
}