const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minLength: 5
        },
        collections: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Collection'
            }
        ],
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        favorites: [
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

// hash the password before saving it to our collection
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    } 

    next();
})

// verify if a given password is valid
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User