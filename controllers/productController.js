const router = require('express').Router()
const { isUser } = require('../middlewares/guards.js')
const { deleteProduct } = require('../services/product.js')

router.get('/create', isUser(), async (req, res) => {

    res.render('product/create')
})

router.post('/create', isUser(), async (req, res) => {

    const productData = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        booked: [],
        author: req.user._id
    }

    try {
        await req.storage.createProduct(productData)
        res.redirect('/')
    } catch (err) {
        let errors
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message)
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            productData: {
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms: req.body.rooms
            }
        }
        //console.log(ctx)
        res.render('product/create', ctx)
    }
})

router.get('/details/:id', async (req, res) => {

    try {
        const product = await req.storage.getProductById(req.params.id)
        //console.log(product)
        product.hasUser = Boolean(req.user)
        product.isAuthor = req.user && req.user._id == product.author
        product.isBooked = req.user && product.booked.find(x=> x==req.user._id)

        res.render('product/details', { product })
    } catch (err) {
        res.redirect('/404')

    }
})
router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const product = await req.storage.getProductById(req.params.id)
        console.log('req.user._id', req.user._id)
        console.log('product.author', product.author)
        if (req.user._id != product.author) {
            throw new Error('Cannot edit')
        }
        res.render('product/edit', { product })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})
router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const product = await req.storage.getProductById(req.params.id)

        if (req.user._id != product.author) {
            throw new Error('Cannot edit')
        }
        await req.storage.editProduct(req.params.id, req.body)
        res.redirect('/')
    } catch (err) {
        let errors
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message)
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            product: {
                _id: req.params.id,
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms: req.body.rooms
            }
        }
        res.render('product/edit', ctx)
    }
})

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const product = await req.storage.getProductById(req.params.id)

        if (req.user._id != product.author) {
            throw new Error('Cannot delete')
        }

        deleteProduct(product)
        res.redirect('/')
    } catch (err) {
        res.redirect('/404')
    }
})
router.get('/book/:id', isUser(), async (req, res) => {
    try {
        await req.storage.bookProduct(req.params.id, req.user._id)
        res.redirect('/products/details/' + req.params.id)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router