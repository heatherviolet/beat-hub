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
        albumId: String
        name: String
        artists: [String]
        cover: String
        year: Int
        reviews: [Review]
        favoritedBy: [User]
    }

    type Review {
        _id: ID
        albumId: String
        body: String
        rating: Int
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
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        favorites(artists: [String], name: String!, albumId: String!, cover: String! reviews: [Review]) : User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;