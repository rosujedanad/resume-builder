import React from "react";
import ErrorPage from "../error/ErrorPage";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { formToJSON } from "axios";

const Resume = () => {
  const handlePrint = () => alert("Print Successful!");
  const location = useLocation();
  const { formData } = location.state;
  console.log(formData);
  return (
    <>
      <main className={styles.container}>
        <div className={styles.resume}>
          <div className={styles.header}>
            <div className={styles.canName}>
              <p>{formData.details.name}</p>
            </div>
            <div className={styles.address}>
              <p className={styles.addText}>
                {formData.contact.place} . {formData.contact.state} .{" "}
                {formData.contact.mobile} . {formData.contact.email}
                {/* { . {formData.contact.linkedin} .{" "}
                {formData.contact.github} */}
              </p>
            </div>
          </div>
          <div className={styles.resBody}>
            <div className={styles.about}>
              <h2 className={styles.resTitle}>Candidate Profile</h2>
              <p className={styles.resTextGen}>{formData.about.about}</p>
            </div>
            <div className={styles.detCol}>
              <div className={styles.colLeft}>
                <div className={styles.leftFields}>
                  <div className="education">
                    <h2 className={styles.resTitle}>Education</h2>
                    <h3 className={styles.edTitle}>
                      {formData.education.hss.school}
                    </h3>
                    <h3 className={styles.edBranch}>
                      {formData.education.hss.stream}
                    </h3>
                    <h3 className={styles.edMks}>
                      Grade/Percentage:{" "}
                      <span className={styles.marks}>
                        {formData.education.hss.percentage}
                      </span>
                    </h3>
                    <h3 className={styles.edTitle}>
                      {formData.education.ug.college}
                    </h3>
                    <h3 className={styles.edBranch}>
                      {formData.education.ug.department}
                    </h3>
                    <h3 className={styles.edMks}>
                      Grade/Percentage:{" "}
                      <span className={styles.marks}>
                        {formData.education.ug.cgpa}
                      </span>
                    </h3>
                  </div>
                  <div className={styles.skills}>
                    <h2 className={styles.resTitle}>Skills</h2>
                    <h3 className={styles.skTitle}>Technical Skills:</h3>
                    <p>{formData.skills.technical[0]}</p>
                  </div>
                </div>
              </div>
              <div className={styles.colRight}></div>
            </div>
          </div>
        </div>
        <button onClick={handlePrint}>Print Page</button>
      </main>
    </>
  );
};

export default Resume;
