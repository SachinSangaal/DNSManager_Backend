const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;
  try
  {
    const user = await User.findOne({ username });
    if (!user) 
    {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Compare the provided password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
    {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful',role: user.role });
  }
  catch (error)
  {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
};