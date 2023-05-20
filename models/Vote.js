const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    vote_type: String,
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;