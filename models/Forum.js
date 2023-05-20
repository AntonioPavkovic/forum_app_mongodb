const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    name: String,
    description: String,
    created_at: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;