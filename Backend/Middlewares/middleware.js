const jwt = require('jsonwebtoken');
const userModel = require('../DbModels/users')
const dotenv = require('dotenv');
dotenv.config();

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, 'asadd4azxxsdwsde');
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticate;
