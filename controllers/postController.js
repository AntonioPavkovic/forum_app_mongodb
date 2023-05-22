const Post = require('../models/Post');

// Display the create post page
const createPostPage = (req, res) => {
  const { forumId } = req.params;
  res.render('posts/new', { forumId });
};

// Create a new post in a forum
const createPost = async (req, res) => {
  try {
    const { forumId } = req.params;
    const { post_name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(forumId)) {
      return res.status(400).json({ error: 'Invalid forum ID' });
    }

    const post = new Post({ post_name, description, forum_id: forumId });
    await post.save();
    res.redirect(`/forums/${forumId}/posts`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts in a forum
const getAllPosts = async (req, res) => {
  try {
    const { forumId } = req.params;
    const posts = await Post.find({ forum_id: forumId });
    res.render('posts/index', { forumId, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific post by ID in a forum
const getPostById = async (req, res) => {
  try {
    const { forumId, postId } = req.params;
    const post = await Post.findOne({ _id: postId, forum_id: forumId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.render('posts/show', { post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Display the edit post page
const editPostPage = async (req, res) => {
  try {
    const { forumId, postId } = req.params;
    const post = await Post.findOne({ _id: postId, forum_id: forumId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.render('posts/edit', { forumId, post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post by ID in a forum
const updatePost = async (req, res) => {
  try {
    const { forumId, postId } = req.params;
    const { post_name, description } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: postId, forum_id: forumId },
      { post_name, description },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.redirect(`/forums/${forumId}/posts`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post by ID in a forum
const deletePost = async (req, res) => {
  try {
    const { forumId, postId } = req.params;
    const post = await Post.findOneAndDelete({ _id: postId, forum_id: forumId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.redirect(`/forums/${forumId}/posts`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPostPage,
  createPost,
  getAllPosts,
  getPostById,
  editPostPage,
  updatePost,
  deletePost
};
