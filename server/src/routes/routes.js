const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

// Define your routes
router.get('/', Controller.getExamples);
router.post('/', Controller.signIn);
// Add more routes as needed

module.exports = router;