const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

// Define your routes
router.get('/', Controller.getExamples);
router.post('/signin', Controller.signIn);
router.patch('/updateResumeCount', Controller.updateResumeCount);
router.post('/createResume', Controller.createResume);
router.get('/viewResume',Controller.viewResume);
router.patch('/updateResume',Controller.updateResume);
// Add more routes as needed

module.exports = router;