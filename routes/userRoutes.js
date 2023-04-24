const router = require('express').Router()
const {listUsers, createUser, getUserById, updateUserById, deleteUserById, newFriend, deleteFriend}= require('../controllers/userController')

router.route('/users').get(listUsers).post(createUser)
router.route('/users/:id').get(getUserById).put(updateUserById).delete(deleteUserById)


router.route('/users/:userId/friends/:friendId')
.post(newFriend).delete(deleteFriend)


module.exports=router