const { User, Thought } = require('../models')


module.exports = {
    async listUsers(req, res) {
        try {
            const users = await User.find({}).select('-__v')
            res.json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createUser(req, res) {
        try {
            const savedUser = await User.create(req.body)
            res.status(201).json(savedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateUserById(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            if (!updatedUser){
                res.status(404).json({message: 'User not found with this ID'})
                return 
            }
            res.status(201).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteUserById(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if (!user){
                res.status(404).json({message: 'User not found with this ID'})
                return 
            }
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async newFriend(req,res){
        try {
            const updatedUser = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$push: {friends: req.params.friendId}},
                {new: true, runValidators: true}
            )
            if (!updatedUser){
                res.status(404).json({message: 'User not found with this ID'})
                return 
            }
            res.status(201).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteFriend(req,res){
        try {
            const updatedUser = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            )
            if (!updatedUser){
                res.status(404).json({message: 'User not found with this ID'})
                return 
            }
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}