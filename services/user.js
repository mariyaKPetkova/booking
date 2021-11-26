const User = require('../models/User.js')
async function createUser(username, email, hashedPassword) {
    const user = new User({
        username,
        email,
        hashedPassword
    })
    await user.save()
    return user
}
async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i')
    const user = await User.findOne({ username: { $regex: pattern } })
    return user
}
async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i')
    const user = await User.findOne({ email: { $regex: pattern } })
    return user
}
async function getUserById(id) {
    const user = await User.findOne({_id:id}).populate('bookedProducts')
    //console.log('userService'+ user);
    return user
}
module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById
}

