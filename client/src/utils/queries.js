import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query {
        me {
            _id
            username
            email
            collections {
                _id
                name
                albumCollection {
                    cover
                }
            }
            reviews {
                _id
                albumId
                body
                rating
            }
            favorites {
                _id
                albumId
                cover
            }
        }
    }
`;

export const FIND_ALBUM = gql`
    query findAlbum($albumId: String!) {
        findAlbum(albumId: $albumId) {
            _id
            name
            cover
            artists
            reviews {
                rating
                body
                author
            }
            averageRating
        }
    }
`;

export const GET_COLLECTION = gql`
    query getCollection($id: ID) {
        getCollection(id: $id) {
            name
            albumCollection {
                name
                cover
                albumId
            }
        }
    }
`;