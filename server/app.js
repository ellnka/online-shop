const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const stripe = require('stripe')('sk_test_51Iv28KElDa1Ijc1K7epKN9Kn7cQJUtjtouLmOmkgxb2JL01nM2M46IK8HIVq6qEqE6HCyUf61ULKFjoMpNnrQsWN00JpBO5qsF');

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const recipeRoutes = require('./routes/recipe');
const recipeStepsRoutes = require('./routes/recipe-steps');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoDB connected');
    })
    .catch((error) => {
        console.log('mongoDB NOT connected', error);
    });

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/recipe-steps', recipeStepsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../dist/online-shop'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../dist/online-shop/index.html'));
  })
}

module.exports = app;
