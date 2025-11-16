const express = require('express');
const userRoutes = require('./routes/usersRoute');
const authRoutes = require('./routes/authRoute');

const app = express();

app.use(express.json());

app.use("/uploads", express.static("uploads")); 

// users
app.use('/profile', userRoutes);

// auth
app.use('/', authRoutes);

// root
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
