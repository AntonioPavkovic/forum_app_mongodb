const express = require('express');
const mongoose = require('mongoose');
const forumRoutes = require('./routes/forumRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = process.env.PORT || 5000;

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

const database = (module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try {
        mongoose.connect(
            'mongodb+srv://antoniopavkovic:SBP-Mongo@cluster0.jjbaqar.mongodb.net/?retryWrites=true&w=majority',
            connectionParams
            );
        console.log('Database connected succesfully');
    } catch (error) {
        console.log(error);
        console.log('database connection failed');
    }

});

database();


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/forums', forumRoutes);
app.use(postRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});