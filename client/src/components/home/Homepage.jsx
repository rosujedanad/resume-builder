import React,{ useState } from 'react';
import styles from './styles.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Resumeblock from '../resumeblock/Resumeblock';

function Homepage() {

  const location = useLocation();

  const {user} = location.state;
  console.log("user", user);

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
  const resumeCount = user.resumecount;
  const calculateGrid = (count) => {
    if (count === 1) {
      return '1fr';
    } else if (count <= 2) {
      return 'repeat(1, 1fr)';
    } else if (count <= 6) {
      return 'repeat(3, 1fr)';
    } else {
      return 'repeat(3, 1fr)';
    }
  };
  

  return (
    <div className={styles.maincontainer}>
      <h1 className={styles.mainheading}>ResuMate</h1>
      <div className={styles.smallcontainer}>
        <img className={styles.template} src="../../src/assets/template.jpeg" alt="illustration"/>
        <div className={styles.rightcontainer}>
          <div className={styles.createbutton}>
            <button  onClick={() => navigate("/form",{ state: { user } })} className={styles.cre_button}>
            <img src="../../src/assets/plus.png" alt="plus sign"/>
            <p>create resume</p>
            </button>
          </div>
          <div className={styles.resblock} style={{ gridTemplateColumns: calculateGrid(resumeCount) }}>
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
