const express = require('express');
const userRoutes = require('./routes/usersRoute');
const authRoutes = require('./routes/authRoute');
const bannersRoutes = require('./routes/bannersRoute');
const servicesRoutes = require('./routes/servicesRoute');

const app = express();

app.use(express.json());

// app.use("/uploads", express.static("uploads")); 

// users
app.use('/profile', userRoutes);

// auth
app.use('/', authRoutes);

// banners
app.use('/banners', bannersRoutes);

// services
app.use('/services', servicesRoutes);

// root
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
