const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'name of the hotel must be at least 4 symbols long'],
        minlength: [4, 'name must be at least 4 characters long']
    },
    city: {
        type: String,
        required: [true, 'name of the city must be at least 3 symbols long'],
        minlength: [4, 'city must be at least 4 characters long']
    },
    imageUrl: {
        type: String,
        required: [true, 'Invalid URL'],
        match: [/^https?:\/\//, 'Image must be a valid URL']
    },
    rooms: {
        type: Number,
        required: [true, 'The count of rooms is required'],
        min: [1, 'Count of rooms must be betwen 1 and 100'],
        max: [100, 'Count of rooms must be betwen 1 and 100']
    },
    booked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Product', schema)