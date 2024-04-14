import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className={styles.apps}>
            <img className={styles.imagefile} src="../../src/assets/erroril.png" alt="loading"/>
            <h3 className={styles.texts3}>
                You've not provided your details. Kindly head back to the{" "}
                <Link to='/home'>homepage</Link>.
            </h3>
        </div>
    );
};
export default ErrorPage;