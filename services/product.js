const Product = require('../models/Products.js')
const User = require('../models/User.js')

async function createProduct(productData){
    const product = new Product(productData)
    await product.save()
    return Product
}

async function getAllProducts(){
    const products = await Product.find({}).lean()
    //search
    return products
}

async function getProductById(id){
    const product = await Product.findById(id).lean()
    
    return product
}

async function editProduct(id,productData){
    const product = await Product.findById(id)
    
    product.name = productData.name
    product.city = productData.city
    product.rooms = Number(productData.rooms)
    product.imageUrl = productData.imageUrl

    return product.save()
}
async function deleteProduct(product){
    return Product.findOneAndDelete(product)
}

async function bookProduct(productId,userId){
    const user = await User.findById(userId)
    const product = await Product.findById(productId)

        if (user._id == product.author) {
            throw new Error('Cannot book your own hotel')
        }
    user.bookedProducts.push(product)
    product.booked.push(user)

    return Promise.all([user.save(),product.save()])
}
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    editProduct,
    deleteProduct,
    bookProduct
}