const product = require('../services/product.js')

module.exports = () => (req, res, next) => {
    req.storage = {
        ...product
    }
    next()
}