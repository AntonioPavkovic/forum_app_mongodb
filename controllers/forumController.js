const Forum = require('../models/Forum');

// Display the create forum page
const createForumPage = (req, res) => {
  res.render('forum/create');
};

// Create a new forum
const createForum = async (req, res) => {
  try {
    const { name, description, user_id } = req.body;
    const forum = new Forum({ name, description, user_id });
    await forum.save();
    res.redirect('/forums');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Display all forums
const getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.render('forum/index', { forums });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Display a specific forum by ID
const getForumById = async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.render('forum/show', { forum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Display the edit forum page
const editForumPage = async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.render('forum/edit', { forum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a forum by ID
const updateForum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const forum = await Forum.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.redirect('/forums');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a forum by ID
const deleteForum = async (req, res) => {
  try {
    const forum = await Forum.findByIdAndDelete(req.params.id);
    if (!forum) {
      return res.status(404).json({ message: 'Forum not found' });
    }
    res.redirect('/forums');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createForumPage,
  createForum,
  getAllForums,
  getForumById,
  editForumPage,
  updateForum,
  deleteForum
};
