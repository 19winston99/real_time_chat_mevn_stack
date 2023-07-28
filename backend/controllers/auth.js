import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoSanitize from 'express-mongo-sanitize';
import validator from 'email-validator';

//REGISTER
export const register = async (req, res) => {

  const data = mongoSanitize.sanitize(req.body);

  if (!data.name || typeof data.name !== 'string') {
    return res.status(400).json({ status: 'error', message: 'Name field invalid' });
  }

  if (!data.lastname || typeof data.lastname !== 'string') {
    return res.status(400).json({ status: 'error', message: 'Lastname field invalid' });
  }

  if (!data.email || typeof data.email !== 'string' || !validator.validate(data.email)) {
    return res.status(400).json({ status: 'error', message: 'Email field invalid' });
  }

  if (!data.password || typeof data.password !== 'string') {
    return res.status(400).json({ status: 'error', message: 'Password field invalid' });
  }

  if (data.password.length < 5) {
    return res.status(400).json({ status: 'error', message: 'Password must be at least 5 characters long' });
  }

  if (data.password !== data.confirmPassword) {
    return res.status(400).json({ status: 'error', message: "Password and confirm password don't match" });
  }

  const passwordHashed = await bcrypt.hash(data.password, 10);
  const user = new User({
    name: data.name,
    lastname: data.lastname,
    email: data.email,
    password: passwordHashed,
  });

  try {
    await user.save();
    res.status(201).json({ status: 'ok', message: 'Registration confirmed' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
  }
};

//LOGIN
export const login = async (req, res) => {
  const { email, password } = mongoSanitize.sanitize(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'Email or passowrd not valid' });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({
      id: user._id,
      email: user.email
    }, process.env.JWT_SECRET);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 DAY
    });
    return res.status(200).json({ status: 'ok', message: 'Login confirmed', user: { id: user._id, name: user.name, lastname: user.lastname, email: user.email } });
  }

  res.status(401).json({ status: 'error', message: 'Email or password not valid' });
}

export const logout = (req, res) => {
  res.cookie('jwt', null, {
    httpOnly: true,
    expires: new Date(0)
  });
  return res.json({ status: 'ok', message: 'Logout confirmed' });
}