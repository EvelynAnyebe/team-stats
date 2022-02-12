const router = require('express').Router();
const {
  createUserValidation,
  loginUserValidation,
} = require('../middleware/requestValidation/auth');
const AuthController = require('../controllers/auth.controller');
const { validateToken } = require('../middleware/auth.middleware');

// eslint-disable-next-line max-len
router.post('/signup', createUserValidation, AuthController.createUser);
router.post('/refreshToken', validateToken, AuthController.refreshToken);
router.post('/login', loginUserValidation, AuthController.loginUser);

module.exports = router;
