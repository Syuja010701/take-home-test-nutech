const express = require('express');
const userRoutes = require('./routes/usersRoute');
const authRoutes = require('./routes/authRoute');
const bannersRoutes = require('./routes/bannersRoute');
const servicesRoutes = require('./routes/servicesRoute');
const balanceRoutes = require('./routes/balanceRoute');

const transactionsRoutes = require('./routes/transactionsRoute');

const app = express();

app.use(express.json());

// users
app.use('/profile', userRoutes);

// auth
app.use('/', authRoutes);

// banners
app.use('/banners', bannersRoutes);

// services
app.use('/services', servicesRoutes);

// balance
app.use('/balance', balanceRoutes);

// transactions
app.use('/', transactionsRoutes);

// root
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
