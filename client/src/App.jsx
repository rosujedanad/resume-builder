import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/form/Form";
import Resume from "./components/Resume";
import Signin from "./components/signin/Signin";
import { Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loading from "./components/loading/Loading";
import ErrorPage from "./components/error/ErrorPage";

const App = () => {
  // Retrieve authentication status from localStorage on component mount
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    return storedAuthStatus ? JSON.parse(storedAuthStatus) : false;
  });

  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", JSON.stringify(status));
  };

  return (
    <div className="App">
      <GoogleOAuthProvider clientId="480714727278-491bm46a67efiq09ol4soij31irjiio4.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/form" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
