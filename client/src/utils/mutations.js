import { gql } from '@apollo/client';

 export const ADD_USER = gql`
     mutation addUser($username: String!, $email: String!, $password: String!) {
         addUser(username: $username, email: $email, password: $password) {
             token
             user {
                 _id
                 username
                 email
             }
         }
     }
 `;

 export const LOGIN = gql`
     mutation login($email: String!, $password: String!) {
         login(email: $email, password: $password) {
             token
             user {
                 _id
                 username
                 email
             }
         }
     }
 `;

 export const ADD_ALBUM = gql`
    mutation addAlbum($albumId: String, $name: String, $artists: [String], $cover: String, $year: Int) {
        addAlbum(albumId: $albumId, name: $name, artists: $artists, cover: $cover, year: $year) {
            _id
            albumId
            name
            artists
            cover
            year
        }
    }
 `;
