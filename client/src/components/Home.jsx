import React, { useState } from "react";
import Loading from "./loading/Loading";

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
  //👇🏻 Renders the Loading component you submit the form
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="detbox">
        <div className="boxdet"></div>
        <div className="boxmain">
          <div className="titlebox">
            <h1 className="Mtitle">Enter your credentials</h1>
          </div>
          <div className="desctext">
            <p className="desc">
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
            <label htmlFor="fullName" className="mhead">
              Full Name:
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              className="fields1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Eg: John Doe"
            />

            <div>
              <label htmlFor="currentLength" className="heading">
                For how long? (year)
              </label>
              <input
                type="number"
                required
                name="currentLength"
                className="fields1"
                value={currentLength}
                onChange={(e) => setCurrentLength(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="currentTechnologies" className="heading">
                Technologies used
              </label>
              <input
                type="text"
                required
                name="currentTechnologies"
                className="fields1"
                value={currentTechnologies}
                onChange={(e) => setCurrentTechnologies(e.target.value)}
              />
            </div>

            <div className="detailset">
              <label className="mhead">Contact Details:</label>
              <div>
                <label className="heading">Address Line 1:</label>
                <input
                  type="text"
                  required
                  className="fields2"
                  placeholder="House Name / Apartment Name / House No."
                ></input>
              </div>
              <div>
                <label className="heading">Address Line 2:</label>
                <input
                  type="text"
                  required
                  className="fields2"
                  placeholder="Street Name / Lane"
                ></input>
              </div>

              <div>
                <label className="heading">State:</label>
                <select
                  required
                  name="state-names"
                  id="state-names"
                  className="fields3"
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
                <label htmlFor="currentPosition" className="heading">
                  Contact Number:
                </label>
                <input
                  type="text"
                  required
                  name="currentPosition"
                  className="fields1"
                  value={currentPosition}
                  placeholder="+XX-XXXXXXXXX"
                  onChange={(e) => setCurrentPosition(e.target.value)}
                />
              </div>

              <div>
                <label className="heading">Email:</label>
                <input
                  type="text"
                  required
                  className="fields1"
                  placeholder="johndoe123@mail.com"
                />
              </div>
            </div>

            <div className="detailset">
              <label className="mhead">Academic Qualifications:</label>

              <div>
                <label className="heading">Select Qualification:</label>
                <select
                  required
                  name="qual1-names"
                  id="qual1-names"
                  className="fields3"
                >
                  <option value="def">Select</option>
                  <option value="SS">Senior Secondary Education</option>
                  <option value="UG">Undergraduate Degree</option>
                </select>
              </div>

              <div>
                <label className="heading">Institution Name:</label>
                <input
                  type="text"
                  required
                  className="fields2"
                  placeholder="Eg. Delhi Public School"
                ></input>
              </div>

              <div>
                <label className="heading">Stream / Branch / Department:</label>
                <input type="text" required className="fields1" />
              </div>

              <div>
                <label className="heading">Grade / Percentage:</label>
                <input type="text" required className="fields1" />
              </div>

              <div>
                <label className="heading">Select Qualification:</label>
                <select name="qual2-names" id="qual2-names" className="fields3">
                  <option value="def">Select</option>
                  <option value="SS">Senior Secondary Education</option>
                  <option value="UG">Undergraduate Degree</option>
                </select>
              </div>

              <div>
                <label className="heading">Institution Name:</label>
                <input
                  type="text"
                  className="fields2"
                  placeholder="Eg. Delhi Public School"
                ></input>
              </div>

              <div>
                <label className="heading">Stream / Branch / Department:</label>
                <input type="text" className="fields1" />
              </div>

              <div>
                <label className="heading">Grade / Percentage:</label>
                <input type="text" className="fields1" />
              </div>
            </div>

            <div className="detailset">
              <label className="mhead">Skills:</label>
              <div className="skilldiv">
                <label className="heading">Technical Skills:</label>
                <textarea
                  className="parabox"
                  placeholder="Python, JavaScript etc."
                ></textarea>
              </div>
              <div className="skilldiv">
                <label className="heading">Soft Skills:</label>
                <textarea
                  className="parabox"
                  placeholder="Leadership, Quick Learner etc."
                ></textarea>
              </div>
            </div>

            <label htmlFor="photo" className="heading">
              Upload your headshot image
            </label>
            <input
              className="fields1"
              type="file"
              name="photo"
              required
              id="photo"
              accept="image/x-png,image/jpeg"
              onChange={(e) => setHeadshot(e.target.files[0])}
            />
            <button className="mbutton">Create Resume</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;
