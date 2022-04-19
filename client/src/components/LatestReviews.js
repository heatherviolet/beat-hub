import React from 'react'
import Review from '../components/profile/review';

export default function LatestReviews({reviews}) {
    return (
        <>
    
            { reviews ? (
                <div className='reviews-container'>
                    <h1>Check Out The Latest Reviews By Others!</h1>
                        { reviews?.slice(0).reverse().map((review, i)=> (
                            <Review key={i} review={review}/>
                        ))}
                </div>
    
                ) : ( <div>there are no reviews in database </div> )
            
            }
    
        </>
      )
}