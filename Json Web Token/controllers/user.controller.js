const DataAuth = require("../models/user.schema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
  try {
    const {token} = req.cookies;
    if (token) {
      const decoded = jwt.verify(token, 'yourSecretKey');
      return res.status(200).send(decoded)
    }else{
      return res.status(200).send("token not found")
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(500).json({ error: "Error decoding token" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await DataAuth.create({ name, email, password: hashedPassword });

    console.log("User signed up successfully");
    return res.redirect('/login');
  } catch (error) {
    console.log("Error during sign-up:", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await DataAuth.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        
        console.log("Login successful:", user);
        return res.status(200).json({ message: "Login successful", token });
      } else {
        console.log("Wrong password for user:", email);
        return res.status(401).json({ message: "Wrong password" });
      }
    } else {
      console.log("User not found with email:", email);
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: 'Error during login' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  req.logOut((err) => {
    if (err) {
      console.error('Error during logout:', err);
    }
    res.redirect('/login');
  });
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await DataAuth.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, 'yourSecretKey', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await DataAuth.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await DataAuth.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

module.exports = { home, signup, login, logout , addUser, deleteUser, editUser };
