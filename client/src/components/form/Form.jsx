import React, { useState } from "react";
import Loading from "../loading/Loading";
import styles from "./styles.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [address, setCurrentAddress] = useState("");
  const [state, setCurrentState] = useState("def");
  const [phno, setCurrentPhno] = useState("");
  const [mail, setCurrentEmail] = useState("");
  const [qualif1, setCurrentQualif1] = useState("def");
  const [qualif1name, setCurrentQualif1Name] = useState("");
  const [qualif1br, setCurrentQualif1Branch] = useState("");
  const [qualif1mk, setCurrentQualif1Mark] = useState("");
  const [qualif2, setCurrentQualif2] = useState("def");
  const [qualif2name, setCurrentQualif2Name] = useState("");
  const [qualif2br, setCurrentQualif2Branch] = useState("");
  const [qualif2mk, setCurrentQualif2Mark] = useState("");
  const [tecskill, setCurrentTecskill] = useState();
  const [sofskill, setCurrentSofskill] = useState();
  const [linkedin, setCurrentLinkedin] = useState();
  const [github, setCurrentGithub] = useState();
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      headshot,
    });
    setLoading(true);
  };

  //Adding Project

  const [ProjInfo1, setProjInfo1] = useState([{ prName: "", prDesc: "" }]);
  const handleAddProj = () =>
    setProjInfo1([...ProjInfo1, { prName: "", prDesc: "" }]);

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

  const [InternInfo, setInternInfo] = useState([
    { intCompName: "", intDur: "", intDesc: "" },
  ]);
  const handleAddInt = () =>
    setInternInfo([
      ...InternInfo,
      { intCompName: "", intDur: "", intDesc: "" },
    ]);

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
  const [ActInfo, setActInfo] = useState([
    { ActName: "", ActRole: "", ActDesc: "" },
  ]);
  const handleAddAct = () =>
    setActInfo([...ActInfo, { ActName: "", ActRole: "", ActDesc: "" }]);

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
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCW-anwcxQinuBvRZZOQiUTNHRRgHxSx-g"
  );

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async function run() {
    const prompt = "Hi";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  run();

  return (
    <div className={styles.app}>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className={styles.detbox}>
        <div className={styles.boxdet}></div>
        <div className="boxmain">
          <div className={styles.titlebox}>
            <h1 className={styles.Mtitle}>Enter your credentials</h1>
          </div>
          <div className={styles.desctext}>
            <p className={styles.desc}>
              <em>
                "Begin now, for every journey starts with a single step..."
              </em>
              <br></br>
              <br></br>Please fill in your details to generate your customised
              resume.
            </p>
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

            <div>
              <label htmlFor="currentLength" className={styles.heading}>
                For how long? (year)
              </label>
              <input
                type="number"
                required
                name="currentLength"
                className={styles.fields1}
                value={currentLength}
                onChange={(e) => setCurrentLength(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="currentTechnologies" className={styles.heading}>
                Technologies used
              </label>
              <input
                type="text"
                required
                name="currentTechnologies"
                className={styles.fields1}
                value={currentTechnologies}
                onChange={(e) => setCurrentTechnologies(e.target.value)}
              />
            </div>

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

            <label htmlFor="photo" className={styles.heading}>
              Upload your headshot image
            </label>
            <input
              className={styles.fields1}
              type="file"
              name="photo"
              required
              id="photo"
              accept="image/x-png,image/jpeg"
              onChange={(e) => setHeadshot(e.target.files[0])}
            />

            <label className={styles.mhead}>Projects you've worked on:</label>
            <form>
              {ProjInfo1.map((project, index) => (
                <div className={styles.projCont} key={index}>
                  <div className="projectName">
                    <label htmlFor="prname" className={styles.heading}>
                      Project Name:
                    </label>
                    <input
                      id="prname"
                      type="text"
                      name="prName"
                      className={styles.fields1}
                      required
                      onChange={(e) => handleUpdateProj(e, index)}
                    />
                  </div>
                  <div className={styles.projDesc}>
                    <label htmlFor="prdesc" className={styles.heading}>
                      Description:
                    </label>
                    <textarea
                      id="prdesc"
                      name="prDesc"
                      className={styles.parabox}
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
                    <label htmlFor="intCompName" className={styles.heading}>
                      Company Name:
                    </label>
                    <input
                      id="intCompName"
                      type="text"
                      name="intCompName"
                      className={styles.fields1}
                      required
                      onChange={(e) => handleUpdateInt(e, index)}
                    />
                  </div>
                  <div className="duration">
                    <label htmlFor="intDur" className={styles.heading}>
                      Duration:
                    </label>
                    <input
                      id="intDur"
                      type="text"
                      name="intDur"
                      className={styles.fields1}
                      required
                      onChange={(e) => handleUpdateInt(e, index)}
                    />
                  </div>
                  <div className={styles.projDesc}>
                    <label htmlFor="intDesc" className={styles.heading}>
                      Description:
                    </label>
                    <textarea
                      id="intDesc"
                      name="intDesc"
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
                    <label htmlFor="actname" className={styles.heading}>
                      Organization / Activity:
                    </label>
                    <input
                      id="actname"
                      type="text"
                      name="ActName"
                      className={styles.fields1}
                      onChange={(e) => handleUpdateAct(e, index)}
                    />
                  </div>
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
                    <label htmlFor="actdesc" className={styles.heading}>
                      Description:
                    </label>
                    <textarea
                      id="actdesc"
                      name="ActDesc"
                      className={styles.parabox}
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
            <button className={styles.mbutton}>Create Resume</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
