const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Adjust depending on how the token is sent

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is set
    const user = await User.findById(decoded.userId); // Ensure userId is being decoded correctly

    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = { _id: user._id, id: user.id }; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;