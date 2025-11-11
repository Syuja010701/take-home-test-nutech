const bcrypt = require('bcrypt');
const UserModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const SALT_ROUNDS = 10;

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
   
    // Simpan ke database 
    const data = await UserModel.createUser(first_name, last_name, email, hashedPassword);

    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil silahkan login',
      data: null,
    });

  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: err.message,
    });
  }
};


const login = async (req, res) => {
  try {
    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ status:false, message: 'Invalid email or password' });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status:false, message: 'Invalid email or password' });
    }

    // Buat JWT token (expired 12 jam)
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    delete user.password;

    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login };
