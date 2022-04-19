import React from 'react'
import LatestCollections from '../components/LatestCollections';
import LatestReviews from '../components/LatestReviews';

import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../utils/queries'
import { GET_COLLECTIONS } from '../utils/queries'



export default function Home() {

  const { loadingReviews, reviewsData } = useQuery(GET_REVIEWS);
  const reviews = reviewsData?.reviews || [];
  console.log(reviews);

  const { loadingCollections, collectionsData } = useQuery(GET_COLLECTIONS);
  const collections = collectionsData;
  console.log(collectionsData);
  
  return (
    <>

      { loadingCollections ? (

        <LatestCollections collections={collections}></LatestCollections>

      ) : (

        <p>Loading Collections... </p>

      )}

      { loadingReviews ? (

        <LatestReviews reviews={reviews}></LatestReviews>

      ) : (

        <p>Loading Reviews... </p>

      )}

    </>
  )
}