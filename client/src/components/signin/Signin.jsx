import styles from "./styles.module.css";
import { GoogleLogin, GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signin() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setUser(codeResponse);

        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json'
            }
          }
        );
        setProfile(response.data);

        // Navigate after successful login and profile retrieval
        navigate('/home'); // Replace with your desired route after login
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    // ... (your existing logic from the previous responses remains here)
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/green_illustration.jpeg" alt="login"/>
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Hey there!</h2>
          <p className={styles.text1}>Welcome</p>
          <p className={styles.text}> You're just one step away from crafting your professional resume.</p>
          <p className={styles.text2}>Sign in with</p>
          <button onClick={login}>Sign in with Google  </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
