const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_name: String,
    description: String,
    vote_count: Number,
    created_at: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    forum_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum' }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;