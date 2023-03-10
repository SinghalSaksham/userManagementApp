import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import OTPPage from "../components/OTPPage";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();

  // axios.defaults.withCredentials = true;
  // const instance = axios.create({
  //   withCredentials: true,
  // });

  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [incorrectCredential, setIncorrectCredential] = useState(false);
  const [otpPage, setOtpPage] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("user");
  }, []);

  const handleForgetPassword = () => {
    setOtpPage(true);
    setEmailVal("");
    setPasswordVal("");
    setEmptyField(false);
    setIncorrectCredential(false);
  };

  const handleEmailChange = (e) => {
    setEmailVal(e.target.value);
  };

  const handlePassChange = (e) => {
    setPasswordVal(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmptyField(false);
    setIncorrectCredential(false);
    if (emailVal == "" || passwordVal == "") {
      setEmptyField(true);
      return;
    }
    setIsLoading(true);

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
        email: emailVal,
        password: passwordVal,
      })
      .then((res) => {
        // console.log("response", res.data);
        window.sessionStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.isActive == false) {
          window.location.href = "/";
          setIncorrectCredential(true);
        } else window.location.href = "/home";
      })
      .catch((error) => {
        console.log("error", error);
        setEmptyField(false);
        setIncorrectCredential(true);
      });
    setIsLoading(false);
    // window.location.href = "/home";
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <div className={`min-h-screen ${styles.leftPhoto} `}>
          <img
            src="/assets/login1.jpg"
            className="bg-center bg-contain h-full w-full"
          />
        </div>
        {otpPage ? (
          <OTPPage setOtpPage={setOtpPage} setIsLoading={setIsLoading} />
        ) : (
          <div className={`flex flex-col p-7 ${styles.loginPage}`}>
            <div className="flex justify-end">
              <Link
                href="/register"
                className={`underline cursor-pointer text-xl mb-3 hover:text-gray-400 ${styles.registerClass}`}
              >
                Register
              </Link>
            </div>
            <h2 className={`${styles.heading} text-5xl mt-20`}>
              Login To Your Account
            </h2>
            <p className="text-[#666] text-xl my-3">
              Enter your details to login
            </p>
            <div className="flex flex-col items-start p-3 justify-start w-full my-12">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
                name="email"
                id="email"
                type="email"
                value={emailVal}
                onChange={handleEmailChange}
                placeholder="Enter your Email"
                required
              ></input>
              <label htmlFor="password">PASSWORD</label>
              <input
                className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
                name="password"
                id="password"
                type="password"
                value={passwordVal}
                onChange={handlePassChange}
                placeholder="Enter your Password"
                required
              ></input>
              {emptyField && (
                <p className="text-red-600">
                  Email or Password cannot be empty
                </p>
              )}
              {incorrectCredential && (
                <p className="text-red-600">Email or Password doesn't match</p>
              )}
              <p
                className="cursor-pointer hover:underline"
                onClick={handleForgetPassword}
              >
                Forgot password?
              </p>
              <div className="flex justify-center w-3/4">
                <button
                  className={`my-5 rounded-lg bg-red-600 text-white ${styles.loginButton}`}
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : null}
    </>
  );
};

export default Login;
