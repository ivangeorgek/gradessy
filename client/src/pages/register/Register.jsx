import { useRef, useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const registerCall = async (userData, setError) => {
  try {
    const res = await axios.post("http://localhost:8800/api/auth/register", userData);
    setError("");
    return res.data;
  } catch (err) {
    setError(err.response.data.message || "An error occurred while registering.");
  }
};

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const isMentor = useRef(false);
  const areaOfExpertise = useRef();
  const title = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Registering new user with email and password");

    if (password.current.value !== confirmPassword.current.value) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      isMentor: isMentor.current.checked,
      areaOfExpertise: areaOfExpertise.current.value,
      title: title.current.value,
    };

    const response = await registerCall(userData, setError);
    if (response) {
      console.log("User registered successfully:", response);
      navigate("/login");
    }
  };

  return (
    <div className="register">
      <div className="registerLogoWrapper">
        <h3 className="registerLogo">Graddesy</h3>
        <span className="registerDesc">
          Join our community and start learning from industry-leading mentors!
        </span>
      </div>
      <form className="registerBox" onSubmit={handleClick}>
        {error && <span className="registerError">{error}</span>}
        <input
          placeholder="Username"
          type="text"
          required
          className="registerInput"
          ref={username}
        />
        <input
          placeholder="Email"
          type="email"
          required
          className="registerInput"
          ref={email}
        />
        <input
          placeholder="Password"
          type="password"
          required
          minLength="6"
          className="registerInput"
          ref={password}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          required
          minLength="6"
          className="registerInput"
          ref={confirmPassword}
        />
        <label className="mentorCheckbox">
          <input
            type="checkbox"
            ref={isMentor}
          />
          <span>I am a mentor</span>
        </label>
        <input
          placeholder="Area of Expertise"
          type="text"
          className="registerInput"
          ref={areaOfExpertise}
        />
        <input
          placeholder="Title"
          type="text"
          className="registerInput"
          ref={title}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
        <span className="registerLogin">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
            Log In
          </Link>
        </span>
      </form>
    </div>
  );
}


