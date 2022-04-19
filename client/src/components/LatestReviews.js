import React from 'react'
import Review from '../components/profile/review';

import {  Card } from "react-bootstrap";


export default function LatestReviews({reviews}) {
    return (
        <>
    
            { reviews ? (
                <div className='reviews-container'>
                    <h1>Check Out The Latest Reviews!</h1>
                        { reviews?.map((review, i)=> (
                            <Review key={i} review={review}/>
                        ))}
                </div>
    
                ) : ( <div>there are no reviews in database </div> )
            
            }
    
        </>
      )
}