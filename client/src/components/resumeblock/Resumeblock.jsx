import React from 'react';
import styles from './styles.module.css';

function Resumeblock(props) {
  return (
    <div className={styles.resublock}>Resume{props.value +1}</div>
  )
}

export default Resumeblock;