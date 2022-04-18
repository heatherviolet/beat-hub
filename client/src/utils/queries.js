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
                albumId
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