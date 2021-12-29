const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    booked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Product', schema)