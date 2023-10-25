const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
      },
      updatedAt: {
        type: Date,
        default: Date.now()
      }
})

module.exports = mongoose.model('Item', ItemSchema)