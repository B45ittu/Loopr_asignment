import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'Qw8!zP3@kL2#vN7$eR5^tB1&xS6*oM9%jU4';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  try {
    // Additional validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email, and password are required',
        error: 'MISSING_FIELDS'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address',
        error: 'INVALID_EMAIL'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists',
        error: 'USER_EXISTS'
      });
    }

    // Password strength info is available from middleware
    const passwordStrength = (req as any).passwordStrength;
    if (passwordStrength) {
      console.log(`User registration - Password strength score: ${passwordStrength.score}/5`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    
    await user.save();
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

