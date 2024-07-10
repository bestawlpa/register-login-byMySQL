import React, { useState } from "react";

const Register = () => {
  const [firstname, setFirstname] = useState("test");
  const [lastname, setLastname] = useState("lastest");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("test@hotmail.com");
  const [password, setPassword] = useState("Test01");
  const [confirmpassword, setConfirmpassword] = useState("Test01");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setError("Passwords do not match!");
      return;
    }

    if (
      !firstname ||
      !lastname ||
      !gender ||
      !email ||
      !password ||
      !confirmpassword
    ) {
      setError("Please complete all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          gender,
          email,
          password,
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("User registration successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2000); // Clear the success message after 5 seconds
        setFirstname("");
        setLastname("");
        setGender("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
      } else {
        const data = await res.json();
        setError(data.message || "User registration failed.");
      }
    } catch (error) {
      setError("Error occurred while registering user.");
      console.log(error);
    }
  };

  return (
    <div className=" big">
      <div className=" big-2">
        <div className=" title">
          <h1>REGISTER</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" container">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <input
              className=" input"
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className=" input"
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <select
              className=" input-1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="ไม่ระบุ">ไม่ระบุ</option>
            </select>
            <input
              className=" input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className=" input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className=" input"
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <button className="btn" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
