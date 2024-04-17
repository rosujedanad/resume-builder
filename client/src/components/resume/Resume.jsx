import React from "react";
import ErrorPage from "../error/ErrorPage";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";

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
              <p className={styles.resTextGen}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                auctor venenatis felis, non ultricies odio faucibus ac.
                Curabitur vestibulum erat nec ligula posuere, in rutrum magna
                mattis. Sed suscipit, ante eget suscipit eleifend, velit libero
                pellentesque libero.
              </p>
            </div>
            <div className="detCol">
              <div className={styles.colLeft}></div>
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
