require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/usersRoute');
const authRoutes = require('./routes/authRoute');

const app = express();

app.use(express.json());

// users
app.use('/users', userRoutes);

// auth
app.use('/', authRoutes);

// Default root route
app.get('/', (req, res) => {
  res.send('API is running...');
});


module.exports = app;
