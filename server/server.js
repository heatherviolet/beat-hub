// create express app
const express = require('express');
const app = express();

const path = require('path');

const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers }= require('./schemas')

// import auth middleware
const { authMiddleware } = require('./utils/auth');

// require the code for connecting to the db
const db = require('./config/connection');

// server port
const PORT = process.env.PORT || 3001;

const startServer = async () => {
    // setup the server with configs
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
    })

    // wait for the server to start
    await server.start();

    // connect the apollo server to our express server
    server.applyMiddleware({ app });

    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();

// parse the URL-encoded data using the qs library, allowing for JSON-like experience
app.use(express.urlencoded({ extended: true }));

// only parse JSON
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// open the database
db.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})