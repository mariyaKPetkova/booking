const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const { isGuest, isUser } = require('../middlewares/guards.js')
const { getUserById } = require('../services/user.js')


router.get('/register', isGuest(), (req, res) => {
    res.render('user/register')
})

router.post(
    '/register',
    isGuest(),
    body('email', 'Invalid email').isEmail(),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 symbols')
        .isAlphanumeric().withMessage('Password may contain only latin letters and numbers'),
    body('repeatPassword').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    }),
    async (req, res) => {
        const { errors } = validationResult(req)
        //console.log(errors)
        try {
            if (errors.length > 0) {
                const message = errors.map(err => err.msg).join('\n')
                throw new Error(message)
            }
            await req.auth.register(req.body.username, req.body.email, req.body.password)
            res.redirect('/')
        } catch (err) {
            console.log(errors)
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username,
                    email: req.body.email,

                }
            }
            res.render('user/register', ctx)
        }

        // if(req.body.username < 3){
        //     throw new Error('User name must be at least 3 symbols')
        // }
    }
)


router.get('/login', isGuest(), (req, res) => {
    res.render('user/login')
})
router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password)
        res.redirect('/')
    } catch (err) {
        console.log(err)
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
            }
        }
        res.render('user/login', ctx)
    }
})
router.get('/logout', (req, res) => {
    req.auth.logout()
    res.redirect('/')
})

router.get('/profile', isUser(), async (req, res) => {
    
    const userInfo = await getUserById(req.user._id)
    const bookedP = userInfo.bookedProducts.map(x=>x.name)
    const user = {
        username:userInfo.username,
        email:userInfo.email,
        booked:bookedP
    }
    console.log(user.booked)
    
    res.render('user/profile',{user})
})

module.exports = router