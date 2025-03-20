const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

const {secretKey} = require('../config/config');

exports.registerUser = async (username, email, password) => {

    const existingUser = await User.findOne({where: {email}});
    if (existingUser) return {error: 'User already exists'};
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username, email, password: hashedPassword
    });
    return {user: newUser};
};


exports.loginUser = async (email, password) => {

    const user = await User.findOne({where: {email}});
    if (!user) return {error: 'Invalid credentials'};

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return {error: 'Invalid credentials'};

    const token =
        jwt.sign({userId: user.id},
            secretKey, {expiresIn: '1h'});
    return {user, token};
}