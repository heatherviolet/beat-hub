import React from 'react'
import AlbumReview from '../components/AlbumReview'
import {  Card } from "react-bootstrap";


export default function LatestReviews({reviews}) {
  return (
    <>

      { reviews && (

        <Card className='reviews-container'>
          {reviews.map(review=> (
            <div className='review-container'>
              <img href=" " />
              <AlbumReview key={review._id} />
            </div>
          ))}
        </Card>

      )}

    </>
  )
}