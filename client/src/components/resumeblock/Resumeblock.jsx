import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Resumeblock(props) {
  console.log(props.value);
  const navigate = useNavigate();
  const editfunction = async () => {
    console.log("edit clicked");
    //call get api
    const response = await axios.get(
      "http://localhost:3000/viewResume",
      {
        params: {
          userid: localStorage.getItem("userid"),
          resumeid: props.value + 1,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    const data = response.data;
    console.log(data);
    navigate("/edit", { state: { data } });
  };
  return (
    <div className={styles.resublock}>
      <img src="../../src/assets/editimage.png" alt="edit illustration" />
      Resume {props.value + 1}
      <button className={styles.editbutton} onClick={() => editfunction()}>
        edit
      </button>
    </div>
  );
}

export default Resumeblock;
