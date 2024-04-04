// Import any required models here
// const Example = require('../models/example');
const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');

const userData = require('../models/userModel');
const { response } = require('express');

// Define your service methods
exports.getExamples = async () => {
  return "value";

};

exports.signin = async (token) => {
  try {
    console.log("token", token);
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    };

    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, requestOptions);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('User Profile:', data);

    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};


