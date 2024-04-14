import React, { useState } from "react";
import Loading from "../loading/Loading";
import styles from "./styles.module.css";
import { GoogleGenerativeAI } from '@google/generative-ai';

const Home = () => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
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

  const [ProjInfo1, setProjInfo1] = useState([{ ProName: "", ProDesc: "" }]);
  const handleAddProj = () =>
    setProjInfo1([...ProjInfo1, { ProName: "", ProDesc: "" }]);

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

  const [InternInfo, setInternInfo] = useState([{ IntName: "", IntDesc: "" }]);
  const handleAddInt = () =>
    setInternInfo([...InternInfo, { IntName: "", IntDesc: "" }]);

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

  //👇🏻 Renders the Loading component you submit the form
  if (loading) {
    return <Loading />;
  }



// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCW-anwcxQinuBvRZZOQiUTNHRRgHxSx-g');

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function run() {
  const prompt = "Hi"

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
                <label className={styles.heading}>Address Line 1:</label>
                <input
                  type="text"
                  required
                  className={styles.fields2}
                  placeholder="House Name / Apartment Name / House No."
                ></input>
              </div>
              <div>
                <label className={styles.heading}>Address Line 2:</label>
                <input
                  type="text"
                  required
                  className={styles.fields2}
                  placeholder="Street Name / Lane"
                ></input>
              </div>

              <div>
                <label className={styles.heading}>State:</label>
                <select
                  required
                  name="state-names"
                  id="state-names"
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
                <label htmlFor="currentPosition" className={styles.heading}>
                  Contact Number:
                </label>
                <input
                  type="text"
                  required
                  name="currentPosition"
                  className={styles.fields1}
                  value={currentPosition}
                  placeholder="+XX-XXXXXXXXX"
                  onChange={(e) => setCurrentPosition(e.target.value)}
                />
              </div>

              <div>
                <label className={styles.heading}>Email:</label>
                <input
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
                  name="qual1-names"
                  id="qual1-names"
                  className={styles.fields3}
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
                  required
                  className={styles.fields2}
                  placeholder="Eg. Delhi Public School"
                ></input>
              </div>

              <div>
                <label className={styles.heading}>
                  Stream / Branch / Department:
                </label>
                <input type="text" required className={styles.fields1} />
              </div>

              <div>
                <label className={styles.heading}>Grade / Percentage:</label>
                <input type="text" required className={styles.fields1} />
              </div>

              <div>
                <label className={styles.heading}>Select Qualification:</label>
                <select
                  name="qual2-names"
                  id="qual2-names"
                  className={styles.fields3}
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
                  className={styles.fields2}
                  placeholder="Eg. Delhi Public School"
                ></input>
              </div>

              <div>
                <label className={styles.heading}>
                  Stream / Branch / Department:
                </label>
                <input type="text" className={styles.fields1} />
              </div>

              <div>
                <label className={styles.heading}>Grade / Percentage:</label>
                <input type="text" className={styles.fields1} />
              </div>
            </div>

            <div className={styles.detailset}>
              <label className={styles.mhead}>Skills:</label>
              <div className={styles.skilldiv}>
                <label className={styles.heading}>Technical Skills:</label>
                <textarea
                  className={styles.parabox}
                  placeholder="Python, JavaScript etc."
                ></textarea>
              </div>
              <div className={styles.skilldiv}>
                <label className={styles.heading}>Soft Skills:</label>
                <textarea
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
                    <label htmlFor="name" className={styles.heading}>
                      Project Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={styles.fields1}
                      required
                      onChange={(e) => handleUpdateProj(e, index)}
                    />
                  </div>
                  <div className={styles.projDesc}>
                    <label htmlFor="position" className={styles.heading}>
                      Description:
                    </label>
                    <textarea
                      className={styles.parabox}
                      placeholder="Python, JavaScript etc."
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
                    <label htmlFor="name" className={styles.heading}>
                      Company Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={styles.fields1}
                      required
                      onChange={(e) => handleUpdateInt(e, index)}
                    />
                  </div>
                  <div className={styles.projDesc}>
                    <label htmlFor="position" className={styles.heading}>
                      Description:
                    </label>
                    <textarea
                      className={styles.parabox}
                      placeholder="Python, JavaScript etc."
                      required
                      onChange={(e) => handleUpdateProj(e, index)}
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
            <div>
              <div className={styles.alter}></div>
              <label className={styles.mhead}>
                Alternate Links (optional):
              </label>
              <div className="linked">
                <label className={styles.heading}>LinkedIn:</label>
                <input
                  type="url"
                  className={styles.fields2}
                  placeholder="https://www.linkedin.com/johndoe"
                ></input>
                <div className="github">
                  <label className={styles.heading}>Github:</label>
                  <input
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
