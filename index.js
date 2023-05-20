const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/User')
const Forum = require('./models/Forum')

const app = express();
const port = process.env.PORT || 5000;


const newUser = new User({
    username: 'antonio',
    password: 'antonio',
    email: 'antonio@gmail.com'
});
  
newUser.save()
  .then((user) => {
    console.log('New user created:', user);
    // Handle success response
  })
  .catch((error) => {
    console.log('Error:', error);
    // Handle error response
});


const createForum = async () => {
    try {
      // Find the user by their username
      const user = await User.findOne({ username: 'antonio' });
  
      if (user) {
        // Create a new forum with the user reference
        const newForum = new Forum({
          name: 'Example Forum',
          description: 'Forum description',
          user_id: user._id,
        });
  
        // Save the new forum
        const forum = await newForum.save();
        console.log('New forum created:', forum);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.log('Error creating forum:', error);
    }
};
  
createForum();

const database = (module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try {
        mongoose.connect(
            'mongodb-atlas-uri',
            connectionParams
            );
        console.log('Database connected succesfully');
    } catch (error) {
        console.log(error);
        console.log('database connection failed');
    }

});

app.set('view engine', 'ejs');

database();


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});