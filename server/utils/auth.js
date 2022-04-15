const jwt = require('jsonwebtoken');

require('dotenv').config();

// MAKE SURE YOU CREATE A .ENV FILE WITH A SECRET, OTHERWISE THIS WILL NOT WORK
const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
    signToken: ({ username, email, _id }) => {
        // specify the payload
        const payload = { username, email, _id };
        // sign payload into a JWT string
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: ({ req }) => {
        // token can be a property of body, query, or header
        let token = req.body.token || req.query.token || req.headers.authorization;

        // if the token is a property of the header (which will look like: Bearer <token>), separate the <token>
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // if no token, simply return the request
        if (!token) {
            return req;
        }

        try {
            // verify the token
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            // set the user property of the req object to the data
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return the request object
        return req;
    }
}