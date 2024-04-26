import React from 'react';
import styles from './styles.module.css';

function Resumeblock(props) {
  return (
      <div className={styles.resublock}>
      <img src="../../src/assets/editimage.png" alt="edit illustration"/>
      Resume {props.value +1}
      <button className={styles.editbutton}>edit</button>
      </div>
  )
}

export default Resumeblock;