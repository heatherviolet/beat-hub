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
        year: Number
        reviews: [Review]
        favoritedBy: [User]
    }

    type Review {
        _id: ID
        albumId: String
        body: String
        rating: Number
    }

    type Collection {
        _id: ID
        name: String
        collection: [Album]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;