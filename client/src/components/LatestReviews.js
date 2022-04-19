import React from 'react'
import AlbumReview from '../components/AlbumReview'
import {  Card } from "react-bootstrap";


export default function LatestReviews({reviews}) {
    return (
        <>
    
            { reviews ? (

                <Card className='reviews-container'>
                    { reviews?.map(review=> (
                        <AlbumReview review={review} key={review._id}/>
                    ))}
                </Card>
    
                ) : ( <div>there are no reviews in database </div> )
            
            }
    
        </>
      )
}