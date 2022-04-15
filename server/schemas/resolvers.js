const { User, Album, Collection, Review } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// queries and mutations
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                                            .select('-__v -password')
                                            .populate('collections')
                                            .populate('reviews')
                                            .populate('favorites')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        getUsers: async () => {
            const data = User.find().select('-__v -password');

            return data;
        },
        getAlbums: async () => {
            const data = Album.find();

            return data;
        },
        getCollections: async () => {
            const data = Collection.find();

            return data;
        },
        getReviews: async () => {
            const data = Review.find();

            return data;
        }
    },

    Mutation: {
        // create a new user given the args
        addUser: async(parent, args) => {
            const user = await User.create(args);
            
            // sign the token
            const token = signToken(user);
            return { token, user }
        },

        // check the validity of the email and the password
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // sign the token
            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers;