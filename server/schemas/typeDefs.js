const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        collections: [Collection]
        reviews: [Review]
        favorites: [Album]
    }

    type Album {
        _id: ID
        albumId: String!
        name: String
        artists: [String]
        cover: String
        year: Int
        reviews: [Review]
        favoritedBy: [User]
        averageRating: Float
    }

    type Review {
        _id: ID
        albumId: String
        body: String
        rating: Float
        author: String
    }

    type Collection {
        _id: ID
        name: String
        albumCollection: [Album]
    }

    type Query {
        me: User
        getUsers: [User]
        getAlbums: [Album]
        getCollections: [Collection]
        getReviews: [Review]
        findAlbum(albumId: String!): Album
        user(username: String!): User
        getCollection(id: ID): Collection
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addAlbum(albumId: String, name: String, artists: [String], cover: String, year: Int): Album
        addFavorite(id: ID): User
        addReview(albumId: String, body: String, rating: Float): Review
        createCollection(name: String): Collection
        addToCollection(collId: ID, albumId: ID): Collection
        drop: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;