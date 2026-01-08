const bcrypt = require('bcryptjs');
const usermodel = require('../models/user_model');
const { signJwt } = require('../../../config/jwt_token');

exports.register = async (req, res) => {
  try {
    let { username, email, pass } = req.body;

    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'Username is required' });
    }
    username = username.toLowerCase().trim();

    const existUsername = await usermodel.findOne({ username });
    if (existUsername) {
      return res.status(409).json({ message: 'username already in use' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!email || email.trim() === '') {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
        message: 'Invalid email format'
  });
}

    email = email.toLowerCase().trim();

    const existUser = await usermodel.findOne({ email });
    if (existUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    if (!pass) {
      return res.status(400).json({ message: 'Password is required' });
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?_&]{8,}$/;

    if (!passwordRegex.test(pass)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
      });
    }

    const hashed_pass = await bcrypt.hash(pass, 10);

    const newUser = await usermodel.create({
      username,
      email,
      password: hashed_pass,
    });

    const token = await signJwt({
      userId: newUser._id,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
