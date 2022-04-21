import React from 'react'
import Review from '../components/profile/review';

export default function LatestReviews({reviews}) {
    return (
        <>
    
            {reviews.length ? (
                <div >
                    <h1 align="center">Check out the latest reviews by others!</h1>
                    <div className='reviews-container'>
                        {reviews?.map((review, i)=> (
                            <Review key={i} review={review}/>
                        )).reverse().slice(0, 10)}
                    </div>
                </div>
    
                ) : ( <h1>There are not enough reviews in the database...</h1> )
            
            }
    
        </>
      )
}