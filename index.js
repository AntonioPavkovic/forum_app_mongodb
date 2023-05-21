const express = require('express');
const mongoose = require('mongoose');
const forumRoutes = require('./routes/forumRoutes');

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
            'mongo-uri',
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

// Routes
app.use('/forums', forumRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});