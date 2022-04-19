import React from 'react'
import LatestCollections from '../components/LatestCollections';
import LatestReviews from '../components/LatestReviews';

import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../utils/queries'
import { GET_COLLECTIONS } from '../utils/queries'



export default function Home() {

  const { loading:loadingReviews, data:reviewsData } = useQuery(GET_REVIEWS);
  const reviews = reviewsData?.getReviews;
  console.log(reviews);

  const { loading:loadingCollections, data:collectionsData } = useQuery(GET_COLLECTIONS);
  const collections = collectionsData?.getCollections;
  console.log(collections);
  
  return (
    <>
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
    </>
  )
}