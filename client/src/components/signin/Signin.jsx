import styles from "./styles.module.css";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import Home from "../form/Form";

function Signin() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setUser(codeResponse);
        setToken(codeResponse.access_token);
        console.log("token", codeResponse.access_token);

        const response = await axios.post(
          "http://localhost:3000/signin",
          { token: codeResponse.access_token }, // This should be the data object
          { headers: { "Content-Type": "application/json" } } // This should be the headers object
        );
        localStorage.setItem("token", codeResponse.access_token);
        setProfile(response.data);
        console.log("User Profile:", response.data.body);
        const userid = response.data.body.userid;
        localStorage.setItem("userid", userid);
        console.log("userid", userid);
        console.log('codetoken', codeResponse.access_token);
        const user = response.data.body;

        // Navigate after successful login and profile retrieval
        navigate("/homepage",{ state: { user } }); // Replace with your desired route after login
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  console.log("token:", token);

  useEffect(() => {
    // ... (your existing logic from the previous responses remains here)
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img
            className={styles.img}
            src="../../src/assets/loginil.jpeg"
            alt="login"
          />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>ResuMate</h2>
          <p className={styles.text1}>Hey there!</p>
          <p className={styles.text}>
            {" "}
            You're just one step away from crafting your professional resume.
          </p>
          <p className={styles.text2}>Sign in with</p>
          <button onClick={login} className={styles.google_btn}>
            <img src="../../src/assets/google.png" alt="Google Logo" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
