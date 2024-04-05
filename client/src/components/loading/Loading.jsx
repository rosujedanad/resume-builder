import React from "react";

const Loading = () => {
    return (
        <div className={styles.application}>
            <div className={styles.centering}>
          <img className={styles.imagefile} src="../../src/assets/loadingil.jpeg" alt="loading"/>
          <h3 className={styles.restext}>Generating your resume.</h3>
          <h3 className={styles.loadtext}>Please wait.....</h3>
            </div>
            
        </div>
    );
};
export default Loading;