const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No Thoughts found with that id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    createThought(req, res) {
        User.findOne({ _id: req.body.userId })
            .then(user => {
                if (!user)
                    res.status(404).json({ message: "No user with that username" });
                else {
                    Thought.create(req.body)
                        .then(thought => {
                            User.findOneAndUpdate(
                                { _id: req.body.userId },
                                { $addToSet: { thoughts: thought._id } },
                                { new: true }
                            );
                            res.json(thought);
                        })
                        .catch(err => res.status(500).json(err));
                    }
                })
                .catch(err => res.status(500).json(err));
            },
            addThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then(thought =>
            !thought
            ? res.status(404).json({ message: "No thought with the Id!" })
            : res.json(thought)
            )
            .catch(err => res.status(500).json(err));
        },
    }