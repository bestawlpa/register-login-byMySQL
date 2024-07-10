import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("test@hotmail.com");
  const [password, setPassword] = useState("Test01");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please complete all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setError("");
        setEmail("");
        setPassword("");
        setSuccess("success");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          // navigate("/");
          window.location.href = "/";
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Error occurred while registering user.");
      console.log(error);
    }
  };
  return (
    <div className=" big">
      <div className=" container-login">
        <div className=" title-login">
          <h1>LOGIN</h1>
        </div>
        {error && (
          <div className=" bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 ">
            {error}
          </div>
        )}
        {success && (
          <div className=" bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 ">
            {success}
          </div>
        )}
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className=" form-input">
              <input
                className=" input-login"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className=" input-login"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=" container-btn">
              <button className="btn-login" type="submit">
                login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
