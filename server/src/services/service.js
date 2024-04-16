// Import any required models here
// const Example = require('../models/example');
const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');

const userData = require('../models/userModel');
const contactData = require('../models/contactModel');
const eduData = require('../models/eduModel');
const skillData = require('../models/skillModel');
const projectData = require('../models/projectModel');
const internData = require('../models/internModel');
const activityData = require('../models/activityModel');

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
    console.log('details',details.userID);

      const newContact = new contactData({
        UserID : details.userID,
        resumeID : details.resumeID,
        place: details.contact.place,
        state : details.contact.state,
        mobile : details.contact.mobile,
        email : details.contact.email,
        linkedin : details.contact.linkedin,
        github : details.contact.github
      });
      await newContact.save();

      const newEdu = new eduData({
        UserID : details.userID,
        resumeID : details.resumeID,
        ug : {
          college : details.education.ug.college,
          department : details.education.ug.department,
          cgpa : details.education.ug.cgpa
        },
        hss :{
          school : details.education.hss.school,
          stream : details.education.hss.stream,
          percentage :details.education.hss.percentage
        }
      }); 
      await newEdu.save();

      const newSkill = new skillData({
        UserID : details.userID,
        resumeID : details.resumeID,
        technical :details.skills.technical,
        soft :details.skills.soft,
      });
      await newSkill.save();  

      const newProjects = Object.values(details.projects).map((project) => ({
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        link: project.link
    }));
    
    const newProjectData = new projectData({
        UserID: details.userID,
        resumeID: details.resumeID,
        projects: newProjects
    });
    
    await newProjectData.save();
     

    const newInternships = Object.values(details.internships).map((internship) => ({
      company: internship.company,
      role: internship.role,
      duration: internship.duration,
      description: internship.description
  }));
  
  const newInternData = new internData({
      UserID: details.userID,
      resumeID: details.resumeID,
      internships: newInternships
  });
  
  await newInternData.save();

  const newActivities = Object.values(details.extraCurricular).map((activity) => ({
    name: activity.name,
    description: activity.description
}));

const newActivityData = new activityData({
    UserID: details.userID,
    resumeID: details.resumeID,
    extraCurricular: newActivities
});

await newActivityData.save();

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

exports.viewResume = async (userid) => {
  try {
    let contact = await contactData.findOne({ UserID:userid});
    contact = {"UserID": contact.UserID,
                "resumeID": contact.resumeID,
                "contact":{
                "place": contact.place,
                "state": contact.state,
                "mobile": contact.mobile,
                "email": contact.email,
                "linkedin": contact.linkedin,
                "github": contact.github}}

    let education = await eduData.findOne({ UserID:userid});
    education = {"ug":{"college": education.ug.college,
                  "department": education.ug.department,  
                  "cgpa": education.ug.cgpa},
                  "hss":{
                  "school": education.hss.school, 
                  "stream": education.hss.stream,
                  "percentage": education.hss.percentage}}

    let skills = await skillData.findOne({ UserID:userid});
    skills = {"skills": {"technical": skills.technical,
                        "soft": skills.soft}}

    let projects = await projectData.findOne({ UserID:userid});
    const modprojects = projects.projects.map((project) =>
                    (
                    {"title":project.title,
                     "description":project.description,
                     "techStack":project.techStack,
                     "link":project.link }))
    const newProjectData = {
      projects: modprojects
    };

    let internships = await internData.findOne({ UserID:userid});
    const modinternships = internships.internships.map((internship) =>
                  ({
                    "company": internship.company,
                    "role": internship.role,
                    "duration": internship.duration,
                    "description": internship.description}
    ))
    const newInternData = {
      projects: modinternships
    };

    let extraCurricular = await activityData.findOne({ UserID:userid});
    const modact =extraCurricular.extraCurricular.map((activity) =>
      ({ "name":activity.name,
        "description": activity.description
      }))
    const newAct ={
      extraCurricular:modact
    }

    const resumeDetails = { contact, education, skills, modprojects, modinternships, modact};
    return resumeDetails;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

