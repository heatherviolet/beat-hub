const { User, Album, Collection, Review } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const db = require('../config/connection');

// queries and mutations
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                                            .select('-__v -password')
                                            .populate('collections')
                                            .populate('reviews')
                                            .populate('favorites');
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        getUsers: async () => {
            const data = User.find().select('-__v -password')
                                    .populate('favorites')
                                    .populate('reviews')
                                    .populate('collections');

            return data;
        },
        getAlbums: async () => {
            const data = Album.find().populate('favoritedBy')
                                    .populate('reviews');

            return data;
        },
        getCollections: async () => {
            const data = Collection.find().populate('albumCollection');

            return data;
        },
        getReviews: async () => {
            const data = Review.find();

            return data;
        },
        findAlbum: async (parent, { albumId }) => {
            const data = await Album.findOne({ albumId: albumId })

            console.log(data)

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
        },

        addAlbum: async (parent, { name, albumId, artists, cover, year }) => {
            const album = await Album.create({ 
                name: name,
                albumId: albumId,
                artists: artists,
                cover: cover,
                year: year
            })

            return album;
        },

        // id = _id property of the album object
        addFavorite: async (parent, { id }, context) => {
            // find a user and update
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { favorites: id } },
                { new: true, runValidators: true }
            ).populate('favorites');

            // find an album and update it
            await Album.findOneAndUpdate(
                { _id: id },
                { $addToSet: { favoritedBy: context.user._id } },
                { new: true, runValidators: true }
            ).populate('favoritedBy');

            return user;
        },

        // albumId = ID from Spotify
        addReview: async (parent, { albumId, body, rating }, context) => {
            const review = await Review.create({
                // albumId refers to Spotify ID
                albumId: albumId,
                body: body,
                rating: rating,
                author: context.user.username
            })

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { reviews: review._id } },
                { new: true, runValidators: true }
            ).populate('reviews');

            await Album.findOneAndUpdate(
                { albumId: albumId }, 
                { $addToSet: { reviews: review._id } },
                { new: true, runValidators: true }
            ).populate('reviews');

            return review;
        },

        // name = whatever name the user gives the collection
        createCollection: async (parent, { name }, context) => {
            const collection = await Collection.create({ name: name });

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { collections: collection._id } },
                { new: true, runValidators: true }
            )

            return collection;
        },

        // collId = _id of the collection
        // albumId = _id of the album
        addToCollection: async (parent, { collId, albumId }) => {
            const albumCollection = await Collection.findOneAndUpdate(
                { _id: collId },
                { $addToSet: { albumCollection: albumId } },
                { new: true, runValidators: true }
            ).populate('albumCollection')

            return albumCollection
        },

        // experimental
        drop: async () => {
            db.dropDatabase();

            return true;
        }
    }
}

module.exports = resolvers;