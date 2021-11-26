const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    bookedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product', default: [] }]
})

module.exports = model('User', schema)