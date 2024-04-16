import React from "react";
import ErrorPage from "../error/ErrorPage";
import { useLocation } from "react-router-dom";

const Resume = () => {
  const handlePrint = () => alert("Print Successful!");
  const location = useLocation();
  const { formData } = location.state;
  console.log(formData);
  return (
    <>
      <button onClick={handlePrint}>Print Page</button>
      <main className="container">
        <p>{formData.details.name}</p>
      </main>
    </>
  );
};

export default Resume;
