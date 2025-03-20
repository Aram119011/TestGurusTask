const authService = require('../services/authService');


exports.register = async (req, res) => {

    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const result = await authService.registerUser(username, email, password);
        if (result.error) {
            return res.status(400).json({message: result.error});
        }

        res.status(201).json({message: 'User registered successfully', token: result.token});
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({message: 'Server error', error: error.message});
    }

};


exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const result = await authService.loginUser(email, password);
        if (result.error) {
            return res.status(400).json({message: result.error});
        }
        res.status(200).json({message: 'Login successful', token: result.token});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};