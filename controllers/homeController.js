const router = require('express').Router()

router.get('/', async (req,res)=>{
    const products = await req.storage.getAllProducts()
    res.render('home/home',{products})
})



module.exports = router