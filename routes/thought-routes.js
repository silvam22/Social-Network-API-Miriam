const router = require('express').Router();

const {
    getThoughts,
    getThoughtsById,
    createThought,
    addThought,
} = require('../controllers/thought-controller');

router.route('/thought').get(getThoughts).post(createThought)
router.route('/thought/:id').get(getThoughtsById).put(addThought)
// router.route('/thought/:id/reactions').post(createReaction)
// router.route(':thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router