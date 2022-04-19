const addReview = async () => {
    try {
        if (parent, { albumId, body, rating }, context) => {
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

const cacheAlbum = async () => {
    // add the album to our database
    try {
        if (!data.findAlbum) {
            await addAlbum({
                variables: {
                    name: album.name,
                    albumId: album.albumId,
                    artists: album.artists.items.map(data => data.profile.name),
                    cover: album.cover,
                    year: album.year
                }
            }).then(promise => {
                addToFavorites(promise.data.addAlbum._id).then(refetch())
            })
        } else {
            addToFavorites(data?.findAlbum?._id).then(refetch());
        }
    } catch (err) {
        console.log(err);
    }
};

const addToFavorites = async (id) => {
    try {
        await addFavorite({
            variables: { id: id }
        }).then(console.log('Added to favorites!'))
    } catch (err) {
        console.error(err)
    }
}
