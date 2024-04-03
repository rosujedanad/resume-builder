import React, { useState } from "react";
import Loading from "./Loading";

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
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div className="detbox">
        <div className="boxdet"></div>
        <div className="boxmain">
          <div className="titlebox">
            <h1 className="Mtitle">Enter your credentials</h1>
          </div>
          <div className="desctext">
            <p className="desc">
              "Begin now, for every journey starts with a single step..."
              <br></br>Please fill in your details to generate your customised
              resume.
            </p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <label htmlFor="fullName" className="heading">
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
