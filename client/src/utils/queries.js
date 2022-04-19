import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query {
        me {
            _id
            username
            email
            collections {
                _id
            }
            reviews {
                _id
            }
            favorites {
                _id
            }
        }
    }
`;

export const FIND_ALBUM = gql`
    query findAlbum($albumId: String!) {
        findAlbum(albumId: $albumId) {
            _id
        }
    }
`;

export const GET_REVIEWS = gql `
    query {
        getReviews {
            _id
            albumId
            body
            rating
        }
    }

`;
export const GET_COLLECTIONS = gql `
    query {
        getCollections {
            _id
            name
            albumCollection {
                _id
                albumId
                name
                artists
                cover
                year
            }
        }
    }

`;