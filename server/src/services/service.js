// Import any required models here
// const Example = require('../models/example');
const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');

const userData = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

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
    const {name, email, picture} = data;

    console.log('name', name, 'email', email,'picture', picture);
    const user = await userData.findOne({Email:email});
    let userid = user ? user.UserID : '';
    let resumeCount = user ? user.ResumeCount : 0;
    if(user){
      console.log('User already exists');
    }
    else{

      userid =  uuidv4();
      const newUser = new userData({
        UserID : userid,
        Name: name,
        Email: email,
        Picture: picture,
        ResumeCount: 0
      });
      await newUser.save();
    }
    return {
      statusCode: 200,
      body: { message: 'User signed in successfully',"userid":userid,"name":name,"email":email,"picture":picture,"resumecount":resumeCount },
    };
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};


exports.CreateResume = async (details) => {
  try{
    console.log('details',details)

    return {
      statusCode: 200,
      body: { message: 'Resume created successfully' },
    };
  }
  catch(error){
    console.error('There was a problem with your fetch operation:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

