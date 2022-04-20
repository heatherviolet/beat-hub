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

 export const ADD_FAVORITE = gql`
    mutation addFavorite($id: ID) {
        addFavorite(id: $id) {
            _id
            username
            favorites {
                name
            }
        }
    }
 `;

 export const CREATE_COLLECTION = gql`
    mutation createCollection($name: String) {
        createCollection(name: $name) {
            name
            albumCollection {
                _id
                name
            }
        }
    }
 `;

 export const ADD_TO_COLLECTION = gql`
    mutation addToCollection($collId: ID, $albumId: ID) {
        addToCollection(collId: $collId, albumId: $albumId) {
            name
            albumCollection {
                _id
                albumId
                name
            }
        }
    }
 `;

 export const DELETE_COLLECTION = gql`
    mutation deleteCollection($Id: ID) {
        deleteCollection(Id: $Id) {
        _id
        name
        }     
    }
 `;

 export const WRITE_REVIEW = gql`
    mutation addReview($albumId: String, $body: String, $rating: Float) {
        addReview(albumId: $albumId, body: $body, rating: $rating) {
            albumId
            body
            author
        }
    }
 `;
