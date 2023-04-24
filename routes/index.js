const router = require('express').Router()
const userRoutes = require('./userRoutes')
const thoughtRoutes = require('./thought-routes')


router.use('/api', userRoutes)
router.use('/api', thoughtRoutes)



module.exports=router
