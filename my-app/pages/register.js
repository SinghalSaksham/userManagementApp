import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { BASE_URL } from "./helper";

const Register = () => {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [revenue, setRevenue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleRevenueChange = (e) => {
    setRevenue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setEmptyField(false);
    setAlreadyExists(false);
    if (
      email == "" ||
      password == "" ||
      username == "" ||
      company == "" ||
      revenue == ""
    ) {
      setEmptyField(true);
      return;
    }
    setIsLoading(true);

    await axios
      .post(`${BASE_URL}/user/`, {
        email,
        password,
        name: username,
        company,
        revenuePercent: revenue,
      })
      .then((res) => {
        // console.log("response", res.data.status);
        window.sessionStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/home";
      })
      .catch((error) => {
        axios
          .post(`${BASE_URL}/user/checkEmail`, {
            email,
          })
          .then((res) => {
            setAlreadyExists(true);
          })
          .catch((error) => {
            console.log(error);
          });
        // setIncorrectCredential(true);
      });
    setIsLoading(false);
    // window.location.href = "/home";
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <div className={`h-full ${styles.leftPhoto} `}>
          <img
            src="/assets/login1.jpg"
            className="bg-center bg-contain h-full w-full"
          />
        </div>
        <div className={`flex flex-col p-7 ${styles.loginPage}`}>
          <div className="flex justify-end">
            <Link
              href="/"
              className={`underline cursor-pointer text-xl mb-3 hover:text-gray-400 ${styles.registerClass}`}
            >
              Login
            </Link>
          </div>
          <h2 className={`${styles.heading} text-5xl mt-1`}>
            Register Yourself
          </h2>
          <div className="flex flex-col items-start p-3 justify-start w-full my-7">
            <label htmlFor="username">USERNAME</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="username"
              id="username"
              type="text"
              placeholder="Enter your User Name"
              value={username}
              onChange={handleUsernameChange}
              required
            ></input>
            <label htmlFor="usercompany">USER COMPANY</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="usercompany"
              id="usercompany"
              type="text"
              placeholder="Enter your User Company"
              value={company}
              onChange={handleCompanyChange}
              required
            ></input>
            <label htmlFor="revenuePercent">REVENUE PERCENT</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="revenuePercent"
              id="revenuePercent"
              type="text"
              placeholder="Enter your Revenue Percent"
              value={revenue}
              onChange={handleRevenueChange}
              required
            ></input>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="email"
              id="email"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
              required
            ></input>
            <label htmlFor="password">PASSWORD</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="password"
              id="password"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={handlePasswordChange}
              required
            ></input>
            {emptyField && (
              <p className="text-red-600">Fields cannot be empty</p>
            )}
            {alreadyExists && (
              <p className="text-red-600">Email already registered with us</p>
            )}
            <div className="flex justify-center w-3/4">
              <button
                className={`mt-5 rounded-lg bg-red-600 text-white ${styles.loginButton}`}
                type="submit"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
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

export default Register;
