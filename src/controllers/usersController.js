const bcrypt = require('bcrypt');
const UserModel = require('../models/usersModel');
const SALT_ROUNDS = 10;

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const id = await UserModel.createUser(name, email, hashedPassword);
    res.status(201).json({ message: 'User created', id });
  } catch (err) {
    console.error('createUser error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUsers, getUserById, createUser };
