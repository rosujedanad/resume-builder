import React from "react";
import ErrorPage from "../error/ErrorPage";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { formToJSON } from "axios";

const Resume = () => {
  const componentRef = useRef();
  const location = useLocation();
  const { formData } = location.state;
  console.log(formData);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${formData.details.name} Resume`,
    options: {
      margin: 100,
      padding: 0,
      overflow: "hidden",
    },
    onAfterPrint: () => alert("Print Successful!"),
  });

  return (
    <>
      <main className={styles.container}>
        <div className={styles.resume} ref={componentRef}>
          <div className={styles.header}>
            <div className={styles.canName}>
              <p>{formData.details.name}</p>
            </div>
            <div className={styles.address}>
              <p className={styles.addText}>
                {formData.contact.place} - {formData.contact.state} -
                {formData.contact.mobile} - {formData.contact.email}
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
                  <div className={styles.education}>
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
                    <div>
                      <p className={styles.sk}>
                        {formData.skills.technical.join(", ")}
                      </p>
                    </div>
                    <h3 className={styles.skTitle}>Technical Skills:</h3>
                    <div>
                      <p className={styles.sk}>
                        {formData.skills.soft.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.colRight}>
                <div className={styles.rightColEle}>
                  <div className={styles.rightFields}>
                    <h2 className={styles.rightTitle}>Projects</h2>
                    {Object.keys(formData.projects).map((projectKey) => (
                      <div key={projectKey}>
                        <h3 className={styles.projTitle}>
                          - {formData.projects[projectKey].title}
                        </h3>
                        <p className={styles.projDesc}>
                          {formData.projects[projectKey].description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className={styles.rightFields}>
                    <h2 className={styles.rightTitle}>Internships</h2>
                    {Object.keys(formData.internships).map((internKey) => (
                      <div key={internKey}>
                        <h3 className={styles.projTitle}>
                          - {formData.internships[internKey].company}
                        </h3>
                        <h3 className={styles.intDur}>
                          Duration:- {formData.internships[internKey].duration}
                        </h3>
                        <p className={styles.projDesc}>
                          {formData.internships[internKey].description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className={styles.rightFields}>
                    <h2 className={styles.rightTitle}>
                      Extracurricular Activities
                    </h2>
                    {Object.keys(formData.extraCurricular).map((exKey) => (
                      <div key={exKey}>
                        <h3 className={styles.projTitle}>
                          - {formData.extraCurricular[exKey].name}
                        </h3>
                        <h3 className={styles.intDur}>
                          {formData.extraCurricular[exKey].role}
                        </h3>
                        <p className={styles.projDesc}>
                          {formData.extraCurricular[exKey].description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.printBtn} onClick={handlePrint}>
          Print Resume
        </button>
      </main>
    </>
  );
};

export default Resume;
