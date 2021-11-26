const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const express = require('express')

const authMiddleware = require('../middlewares/auth.js')
const storageMiddleware = require('../middlewares/storage.js')

module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs'
    }))
    app.set('view engine', 'hbs')
    app.use('/static', express.static('static'))
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(authMiddleware())
    app.use(storageMiddleware())

    // app.use((req, res, next) => {
    //     console.log('>>>>',req.method,req.url)
        
    //     if (req.user) {
    //         console.log('known user:', req.user)
    //     }
    //     next()
    // })
}