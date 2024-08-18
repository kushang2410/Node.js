const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/user.auth');

module.exports = () => {
  const { Router } = require('express');
  const { home, signup, login, logout, addUser, deleteUser, editUser } = require('../controllers/user.controller');
  const router = express.Router();

  router.get('/data', home);

  router.post('/signup', signup);

  router.post('/login', login);
  router.get('/logout', logout);

  router.post('/addUser', addUser);
  router.delete('/deleteUser/:id', verifyToken, deleteUser);
  router.patch('/editUser/:id', verifyToken, editUser);

  return router;
}
