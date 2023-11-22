import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const loginCall = async (userCredential, dispatch, setError) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:8800/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    setError("Error logging in - check your email and password");
  }
};

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Logging in with email and password");
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
      setError
    );
  };

  return (
    <div className="login">
      <div className="loginLogoWrapper">
        <h3 className="loginLogo">Graddesy</h3>
        <span className="loginDesc">
        Discover your potential with industry-leading mentors!
        </span>
      </div>
      <form className="loginBox" onSubmit={handleClick}>
        {error && <span className="loginError">{error}</span>}
        <input
          placeholder="Email"
          type="email"
          required
          className="loginInput"
          ref={email}
        />
        <input
          placeholder="Password"
          type="password"
          required
          className="loginInput"
          ref={password}
        />
        <button className="loginButton" type="submit">
          Log In
        </button>
        <span className="loginForgot">Forgot Password?</span>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="loginRegisterButton" type="button">
            Create a New Account
          </button>
        </Link>
      </form>
    </div>
  );
}


