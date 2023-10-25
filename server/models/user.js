const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error)
    })
})
module.exports = mongoose.model('User', UserSchema)