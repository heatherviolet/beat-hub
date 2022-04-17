const { Schema, model } = require('mongoose');

// album schema
const albumSchema = new Schema(
    {
        // copy spotify id of album to this value 
        albumId: { 
            type: String,
            required: true,
            unique: true
        },
        name: { 
            type: String, 
            required: true
        },
        artists: [
            {
                type: String
            }
        ],
        cover: { 
            type: String, 
            required: true
        },
        year: {
            type: Number, 
            required: true
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        favoritedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

// calculate the average user rating of an album
albumSchema.virtual('averageRating').get(function() {
    let totalRating = 0;

    for (let i = 0; i < this.reviews.length; i++) {
        totalRating += this.reviews[i].rating;
    }

    return (totalRating/this.reviews.length);
});

const Album = model('Album', albumSchema);

module.exports = Album;