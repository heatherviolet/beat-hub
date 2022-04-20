import React, { useState } from 'react'
import LatestCollections from '../components/LatestCollections';
import LatestReviews from '../components/LatestReviews';

import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../utils/queries'
import { GET_COLLECTIONS } from '../utils/queries'

import './homeStyles.css'

export default function Home() {
  const [fetched, setFetched] = useState(false);

  const { loading:loadingReviews, data:reviewsData, refetch: refetchReviews } = useQuery(GET_REVIEWS);
  const reviews = reviewsData?.getReviews;

  const { loading:loadingCollections, data:collectionsData, refetch: refetchCollections } = useQuery(GET_COLLECTIONS);
  const collections = collectionsData?.getCollections;

  if (!fetched) {
    setTimeout(() => {
      refetchCollections();
      refetchReviews();
    }, 100)
    setFetched(true);
  }
  
  return (
    <div className="mx-auto" style={{paddingBottom: '120px'}}>
      <h1 align="center" style={{marginBottom: '50px'}}>Welcome to Beet Hub!</h1>
      <div>
        { loadingCollections ? (
          <p>Loading Collections... </p>
        ) : (
          <LatestCollections collections={collections}></LatestCollections>
        )}


        { loadingReviews ? (
          <p>Loading Reviews... </p>
        ) : (
          <LatestReviews reviews={reviews}></LatestReviews>
        )}
      </div>
    </div>
  )
}