const { Schema, model } = require('mongoose');

const collectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        collection: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Album'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const Collection = model('Collection', collectionSchema);

module.exports = Collection;

