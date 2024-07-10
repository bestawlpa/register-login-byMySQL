import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className=" home">
      HOME
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default Home;
