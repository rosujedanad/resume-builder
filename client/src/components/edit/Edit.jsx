import React, { useState } from "react";
import Loading from "../loading/Loading";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import dataVal from "./sampledata";

const EditPage = () => {
  const location = useLocation();
  let { data } = location.state;
  console.log("data in edit", data);
  const dataVal = data;
  let projKeys = Object.keys(dataVal.projects);
  let projNum = projKeys.length;
  console.log(dataVal.extraCurricular.activity1.role);
  const navigate = useNavigate();
  const initialProjectState = Object.values(dataVal.projects).map(
    (project) => ({
      prName: project.title,
      prDesc: project.description,
    })
  );

  const initialInternState = Object.values(dataVal.internships).map(
    (intern) => ({
      intCompName: intern.company,
      intDur: intern.duration,
      intDesc: intern.description,
    })
  );

  const initialExtraState = Object.values(dataVal.extraCurricular).map(
    (activity) => ({
      ActName: activity.name,
      // ActRole: activity.role,
      ActDesc: activity.description,
    })
  );

  const [fullName, setFullName] = useState(dataVal.details.name);
  const [address, setCurrentAddress] = useState(dataVal.contact.place);
  const [state, setCurrentState] = useState(dataVal.contact.state);
  const [phno, setCurrentPhno] = useState(dataVal.contact.mobile);
  const [mail, setCurrentEmail] = useState(dataVal.contact.email);
  const [qualif1, setCurrentQualif1] = useState(dataVal.education.ed1.qualif);
  const [qualif1name, setCurrentQualif1Name] = useState(
    dataVal.education.ed1.institute
  );
  const [qualif1br, setCurrentQualif1Branch] = useState(
    dataVal.education.ed1.department
  );
  const [qualif1mk, setCurrentQualif1Mark] = useState(
    dataVal.education.ed2.cgpa
  );
  const [qualif2, setCurrentQualif2] = useState(dataVal.education.ed2.qualif);
  const [qualif2name, setCurrentQualif2Name] = useState(
    dataVal.education.ed2.institute
  );
  const [qualif2br, setCurrentQualif2Branch] = useState(
    dataVal.education.ed1.department
  );
  const [qualif2mk, setCurrentQualif2Mark] = useState(
    dataVal.education.ed1.cgpa
  );
  const [tecskill, setCurrentTecskill] = useState(
    dataVal.skills.technical.join(", ")
  );
  const [splitTecSkill, setCurrentSplitTec] = useState([]);
  const [sofskill, setCurrentSofskill] = useState(
    dataVal.skills.soft.join(", ")
  );
  const [linkedin, setCurrentLinkedin] = useState(dataVal.contact.linkedin);
  const [github, setCurrentGithub] = useState(dataVal.contact.github);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formData = {
      details: {
        name: fullName,
        email: mail,
      },
      contact: {
        place: address,
        state: state,
        mobile: phno,
        email: mail,
        linkedin: linkedin,
        github: github,
      },
      education: {
        ed1: {
          qualif: qualif1,
          institute: qualif1name,
          department: qualif1br,
          cgpa: qualif1mk,
        },
        ed2: {
          qualif: qualif2,
          institute: qualif2name,
          department: qualif2br,
          cgpa: qualif2mk,
        },
      },
      skills: {
        technical: tecskill.split(","),
        soft: sofskill.split(","),
      },
      projects: ProjInfo1.reduce((acc, project, index) => {
        acc[`project${index + 1}`] = {
          title: project.prName,
          description: project.prDesc,
        };
        return acc;
      }, {}),
      internships: InternInfo.reduce((acc, internship, index) => {
        acc[`internship${index + 1}`] = {
          company: internship.intCompName,
          duration: internship.intDur,
          description: internship.intDesc,
        };
        return acc;
      }, {}),
      extraCurricular: ActInfo.reduce((acc, activity, index) => {
        acc[`activity${index + 1}`] = {
          name: activity.ActName,
          role: activity.ActRole,
          description: activity.ActDesc,
        };
        return acc;
      }, {}),
    };

    let resumedetails = formData;
    resumedetails = { userID: userid, resumeID: data.resumeID, ...resumedetails };

    const submitResumeData = async (resumedetails) => {
      try {
        console.log("Submitting resume data:", resumedetails);

        // Once the response is received, continue with other actions
        const about = await aboutapi(formData.skills);
        if (!about) {
          navigate("/loading");
          return;
        }

        const updatedResumeDetails = { ...resumedetails, about: { about } };
        setResumeData(updatedResumeDetails);
        console.log("up",updatedResumeDetails)
        const response = await axios.patch(
          "http://localhost:3000/updateResume",
          updatedResumeDetails,
          {
            params: {
              userid: localStorage.getItem("userid"),
              resumeid: updatedResumeDetails.resumeID,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        formData = updatedResumeDetails;
        console.log("Updated resumedetails:", updatedResumeDetails);
        const updatedResumeDetailsJSON = JSON.stringify(updatedResumeDetails);
        console.log("Updated resumedetails:", updatedResumeDetailsJSON);

        // Assuming `resumeData` is defined elsewhere
        // updatedResumeDetails && <Resume foormData={updatedResumeDetails} />;
        //if(resumeData){navigate("/resume", { state: {resumeData }});}
        navigate("/resume", { state: { formData } });
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    submitResumeData(resumedetails);
  };

  //Adding Project

  const [ProjInfo1, setProjInfo1] = useState(initialProjectState);
  const handleAddProj = () => {
    // Add a new project with empty values
    const newProject = { prName: "", prDesc: "" };
    setProjInfo1([...ProjInfo1, newProject]);
  };

  //Handling Project
  const handleRemoveProj = (index) => {
    const ProjList = [...ProjInfo1];
    ProjList.splice(index, 1);
    setProjInfo1(ProjList);
  };
  const handleUpdateProj = (e, index) => {
    const { name, value } = e.target;
    const ProjList = [...ProjInfo1];
    ProjList[index][name] = value;
    setProjInfo1(ProjList);
  };

  //Adding Internship

  const [InternInfo, setInternInfo] = useState(initialInternState);
  const handleAddInt = () => {
    const newIntern = { intCompName: "", intDur: "", intDesc: "" };
    setInternInfo([...InternInfo, newIntern]);
  };

  //Handling Internship
  const handleRemoveInt = (index) => {
    const IntList = [...InternInfo];
    IntList.splice(index, 1);
    setInternInfo(IntList);
  };
  const handleUpdateInt = (e, index) => {
    const { name, value } = e.target;
    const IntList = [...InternInfo];
    IntList[index][name] = value;
    setInternInfo(IntList);
  };

  //Adding Cocurricular Activities
  const [ActInfo, setActInfo] = useState(initialExtraState);
  const handleAddAct = () => {
    // ActRole to be added in newAct
    const newAct = { ActName: "", ActDesc: "" };
    setActInfo([...ActInfo, newAct]);
  };

  //Handling Cocurricular Activities
  const handleRemoveAct = (index) => {
    const ActList = [...ActInfo];
    ActList.splice(index, 1);
    setActInfo(ActList);
  };
  const handleUpdateAct = (e, index) => {
    const { name, value } = e.target;
    const ActList = [...ActInfo];
    ActList[index][name] = value;
    setActInfo(ActList);
  };

  //👇🏻 Renders the Loading component you submit the form
  if (loading) {
    return <Loading />;
  }

  // Access your API key as an environment variable (see "Set up your API key" above)
  // const genAI = new GoogleGenerativeAI(
  //   "AIzaSyCW-anwcxQinuBvRZZOQiUTNHRRgHxSx-g"
  // );

  // // For text-only input, use the gemini-pro model
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // async function run() {
  //   const prompt = "Hi";

  //   const result = await model.generateContent(prompt);
  //   const response = await result.response;
  //   const text = response.text();
  //   console.log(text);
  // }

  // run();
  const aboutapi = async (skills) => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyDbvLnLCALnrt_X4Ydr-nY2zmg-M1JqyV8"
    );
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    skills = JSON.stringify(skills);
    console.log("skills", skills.technical);
    const prompt = `i am writing a resume. write an about section for a resume for a engineer with the following skills: ${skills} in about 30-35 words.`;
    console.log(prompt);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
    return text;
  };

  return (
    <div className={styles.back}>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className={styles.detbox}>
        <div className={styles.boxdet}></div>
        <div className="boxmain">
          <div className={styles.titlebox}>
            <h1 className={styles.Mtitle}>Edit your resume</h1>
          </div>

          <form
            onSubmit={handleFormSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <label htmlFor="fullName" className={styles.mhead}>
              Full Name:
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              className={styles.fields1}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Eg: John Doe"
            />

            <div className={styles.detailset}>
              <label className={styles.mhead}>Contact Details:</label>
              <div>
                <label htmlFor="address" className={styles.heading}>
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  value={address}
                  type="text"
                  required
                  className={styles.fields2}
                  placeholder="House Name, Street Name, City"
                  onChange={(e) => setCurrentAddress(e.target.value)}
                ></input>
              </div>

              <div>
                <label htmlFor="state" className={styles.heading}>
                  State:
                </label>
                <select
                  required
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => setCurrentState(e.target.value)}
                  className={styles.fields3}
                >
                  <option value="def">Select</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CT">Chhattisgarh</option>
                  <option value="GA">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="GA">Goa</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TG">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UT">Uttarakhand</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="WB">West Bengal</option>
                  <option value="AN">Andaman and Nicobar Islands</option>
                  <option value="CH">Chandigarh</option>
                  <option value="DN">Dadra and Nagar Haveli</option>
                  <option value="DD">Daman and Diu</option>
                  <option value="DL">Delhi</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="PY">Puducherry</option>
                </select>
              </div>

              <div>
                <label htmlFor="phno" className={styles.heading}>
                  Contact Number:
                </label>
                <input
                  id="phno"
                  type="text"
                  required
                  name="phno"
                  className={styles.fields1}
                  value={phno}
                  placeholder="+XX-XXXXXXXXX"
                  onChange={(e) => setCurrentPhno(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="mail" className={styles.heading}>
                  Email:
                </label>
                <input
                  id="mail"
                  name="mail"
                  value={mail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  type="text"
                  required
                  className={styles.fields1}
                  placeholder="johndoe123@mail.com"
                />
              </div>
            </div>

            <div className={styles.detailset}>
              <label className={styles.mhead}>Academic Qualifications:</label>

              <div>
                <label className={styles.heading}>Select Qualification:</label>
                <select
                  required
                  name="qualif1"
                  id="qualif1"
                  value={qualif1}
                  className={styles.fields3}
                  onChange={(e) => setCurrentQualif1(e.target.value)}
                >
                  <option value="def">Select</option>
                  <option value="SS">Senior Secondary Education</option>
                  <option value="UG">Undergraduate Degree</option>
                </select>
              </div>

              <div>
                <label className={styles.heading}>Institution Name:</label>
                <input
                  type="text"
                  name="qualif1name"
                  value={qualif1name}
                  onChange={(e) => setCurrentQualif1Name(e.target.value)}
                  required
                  className={styles.fields2}
                  placeholder="Eg. Delhi Public School"
                ></input>
              </div>

              <div>
                <label className={styles.heading}>
                  Stream / Branch / Department:
                </label>
                <input
                  name="qualif1br"
                  value={qualif1br}
                  onChange={(e) => setCurrentQualif1Branch(e.target.value)}
                  type="text"
                  required
                  className={styles.fields1}
                  placeholder="Computer Science and Mathematics"
                />
              </div>

              <div>
                <label className={styles.heading}>Grade / Percentage:</label>
                <input
                  type="text"
                  required
                  className={styles.fields1}
                  name="qualif1mk"
                  value={qualif1mk}
                  onChange={(e) => setCurrentQualif1Mark(e.target.value)}
                />
              </div>

              <div>
                <label className={styles.heading}>Select Qualification:</label>
                <select
                  name="qualif2"
                  id="qualif2"
                  value={qualif2}
                  className={styles.fields3}
                  onChange={(e) => setCurrentQualif2(e.target.value)}
                >
                  <option value="def">Select</option>
                  <option value="SS">Senior Secondary Education</option>
                  <option value="UG">Undergraduate Degree</option>
                </select>
              </div>

              <div>
                <label className={styles.heading}>Institution Name:</label>
                <input
                  type="text"
                  name="qualif2name"
                  value={qualif2name}
                  onChange={(e) => setCurrentQualif2Name(e.target.value)}
                  className={styles.fields2}
                  placeholder="Eg. Delhi Public School"
                ></input>
              </div>

              <div>
                <label className={styles.heading}>
                  Stream / Branch / Department:
                </label>
                <input
                  name="qualif2br"
                  value={qualif2br}
                  onChange={(e) => setCurrentQualif2Branch(e.target.value)}
                  type="text"
                  className={styles.fields1}
                />
              </div>

              <div>
                <label className={styles.heading}>Grade / Percentage:</label>
                <input
                  type="text"
                  className={styles.fields1}
                  name="qualif2mk"
                  value={qualif2mk}
                  onChange={(e) => setCurrentQualif2Mark(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.detailset}>
              <label className={styles.mhead}>Skills:</label>
              <div className={styles.skilldiv}>
                <label htmlFor="tecskill" className={styles.heading}>
                  Technical Skills:
                </label>
                <textarea
                  id="tecskill"
                  name="tecskill"
                  value={tecskill}
                  className={styles.parabox}
                  onChange={(e) => setCurrentTecskill(e.target.value)}
                  placeholder="Python, JavaScript etc."
                ></textarea>
              </div>
              <div className={styles.skilldiv}>
                <label htmlFor="sofskill" className={styles.heading}>
                  Soft Skills:
                </label>
                <textarea
                  id="sofskill"
                  name="sofskill"
                  value={sofskill}
                  onChange={(e) => setCurrentSofskill(e.target.value)}
                  className={styles.parabox}
                  placeholder="Leadership, Quick Learner etc."
                ></textarea>
              </div>
            </div>

            <label className={styles.mhead}>Projects you've worked on:</label>
            <form>
              {ProjInfo1.map((project, index) => (
                <div className={styles.projCont} key={index}>
                  <div className="projectName">
                    <label
                      htmlFor={`prname${index}`}
                      className={styles.heading}
                    >
                      Project Name:
                    </label>
                    <input
                      id={`prname${index}`}
                      type="text"
                      name={`prName${index}`}
                      className={styles.fields1}
                      value={project.prName}
                      required
                      onChange={(e) => handleUpdateProj(e, index)}
                    />
                  </div>
                  <div className={styles.projDesc}>
                    <label
                      htmlFor={`prdesc${index}`}
                      className={styles.heading}
                    >
                      Description:
                    </label>
                    <textarea
                      id={`prdesc${index}`}
                      name={`prDesc${index}`}
                      className={styles.parabox}
                      value={project.prDesc}
                      required
                      onChange={(e) => handleUpdateProj(e, index)}
                    ></textarea>
                  </div>

                  <div className="btn__group">
                    {ProjInfo1.length - 1 === index && ProjInfo1.length < 4 && (
                      <button className={styles.addBtn} onClick={handleAddProj}>
                        +
                      </button>
                    )}
                    {ProjInfo1.length > 1 && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleRemoveProj(index)}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </form>

            <label className={styles.mhead}>Internships:</label>
            <form>
              {InternInfo.map((intern, index) => (
                <div className={styles.projCont} key={index}>
                  <div className="intComp">
                    <label
                      htmlFor={`intcompname${index}`}
                      className={styles.heading}
                    >
                      Company Name:
                    </label>
                    <input
                      id={`intcompname${index}`}
                      type="text"
                      name={`intCompName${index}`}
                      value={intern.intCompName}
                      className={styles.fields1}
                      onChange={(e) => handleUpdateInt(e, index)}
                    />
                  </div>
                  <div className="duration">
                    <label
                      htmlFor={`intdur${index}`}
                      className={styles.heading}
                    >
                      Duration:
                    </label>
                    <input
                      id={`intdur${index}`}
                      type="text"
                      name={`intDur${index}`}
                      className={styles.fields1}
                      value={intern.intDur}
                      required
                      onChange={(e) => handleUpdateInt(e, index)}
                    />
                  </div>
                  <div className={styles.projDesc}>
                    <label
                      htmlFor={`intdesc${index}`}
                      className={styles.heading}
                    >
                      Description:
                    </label>
                    <textarea
                      id={`intdesc${index}`}
                      name={`intDesc${index}`}
                      value={intern.intDesc}
                      className={styles.parabox}
                      required
                      onChange={(e) => handleUpdateInt(e, index)}
                    ></textarea>
                  </div>

                  <div className="btn__group">
                    {InternInfo.length - 1 === index &&
                      InternInfo.length < 4 && (
                        <button
                          className={styles.addBtn}
                          onClick={handleAddInt}
                        >
                          +
                        </button>
                      )}
                    {InternInfo.length > 1 && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleRemoveInt(index)}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </form>

            <label className={styles.mhead}>Cocurricular Activites:</label>
            <form>
              {ActInfo.map((act, index) => (
                <div className={styles.projCont} key={index}>
                  <div className="actname">
                    <label
                      htmlFor={`actname${index}`}
                      className={styles.heading}
                    >
                      Organization / Activity:
                    </label>
                    <input
                      id={`actname${index}`}
                      type="text"
                      name={`ActName${index}`}
                      value={act.ActName}
                      className={styles.fields1}
                      onChange={(e) => handleUpdateAct(e, index)}
                    />
                  </div>
                  {/* Extracurricular Activity Role to be defined in backend */}
                  <div className="actrole">
                    <label htmlFor="actrole" className={styles.heading}>
                      Role:
                    </label>
                    <input
                      id="actrole"
                      type="text"
                      name="ActRole"
                      className={styles.fields1}
                      onChange={(e) => handleUpdateAct(e, index)}
                    />
                  </div>
                  <div className={styles.projDesc}>
                    <label
                      htmlFor={`actdesc${index}`}
                      className={styles.heading}
                    >
                      Description:
                    </label>
                    <textarea
                      id={`actdesc${index}`}
                      name={`ActDesc${index}`}
                      className={styles.parabox}
                      value={act.ActDesc}
                      onChange={(e) => handleUpdateAct(e, index)}
                    ></textarea>
                  </div>

                  <div className="btn__group">
                    {ActInfo.length - 1 === index && ActInfo.length < 4 && (
                      <button className={styles.addBtn} onClick={handleAddAct}>
                        +
                      </button>
                    )}
                    {ActInfo.length > 1 && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleRemoveAct(index)}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </form>
            <div>
              <div className={styles.alter}></div>
              <label className={styles.mhead}>
                Alternate Links (optional):
              </label>
              <div className="linked">
                <label className={styles.heading}>LinkedIn:</label>
                <input
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => setCurrentLinkedin(e.target.value)}
                  type="url"
                  className={styles.fields2}
                  placeholder="https://www.linkedin.com/johndoe"
                ></input>
                <div className="github">
                  <label className={styles.heading}>Github:</label>
                  <input
                    name="github"
                    value={github}
                    onChange={(e) => setCurrentGithub(e.target.value)}
                    type="url"
                    className={styles.fields2}
                    placeholder="https://github.com/johndoe"
                  ></input>
                </div>
              </div>
            </div>
            <button className={styles.mbutton} onClick={handleFormSubmit}>
              Update Resume
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
