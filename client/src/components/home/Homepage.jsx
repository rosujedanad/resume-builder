import React,{ useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import Resumeblock from '../resumeblock/Resumeblock';

function Homepage() {
  const navigate= useNavigate();
  // const [resumeCount, setResumeCount] = useState(0);

  // const addResume = () => {
  //   setResumeCount(prevCount => prevCount + 1);
  // };
  
  // const renderBlocks = () => {
  //   const blocks = [];
  //   for (let i = 0; i < resumeCount; i++) {
  //     blocks.push(<div key={i} className={styles.block}>{`Resume ${i + 1}`}</div>);
  //   }
  //   return blocks;
  // };
  const resumeCount = 3

  return (
    <div className={styles.maincontainer}>
      <h1 className={styles.mainheading}>ResuMate</h1>
      <div className={styles.smallcontainer}>
        <img className={styles.template} src="../../src/assets/template.jpeg" alt="illustration"/>
        <div className={styles.rightcontainer}>
          <div className={styles.createbutton}>
            <button  onClick={() => navigate("/Form")} className={styles.cre_button}>
            <img src="../../src/assets/plus.png" alt="plus sign"/>
            <p>create new resume</p>
            </button>
          </div>
          <div className="styles.resblock">
            {[...Array(resumeCount)].map((_, index) => (
                    <Resumeblock key={index} value={index} />
                ))}
          </div>
        </div>
        {/* {renderBlocks()} */}
      </div>
    </div>
  );  
}

export default Homepage;
