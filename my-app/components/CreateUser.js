import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { BASE_URL } from "@/pages/helper";

const CreateUser = ({ setCreateUser }) => {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [revenue, setRevenue] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleRevenueChange = (e) => {
    setRevenue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyField(false);

    if (email == "" || username == "" || revenue == "" || company == "") {
      setEmptyField(true);
      return;
    }
    setIsLoading(true);
    const url = `${BASE_URL}/user/`;
    const password = "abc123";
    // console.log("username", username);
    // console.log("email", email);
    // console.log("revenue", revenue);
    // console.log("company", company);
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
        // window.sessionStorage.setItem("user", JSON.stringify(res.data));
        setCreateUser(false);
        // window.location.href = "/home";
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
  };
  return (
    <>
      <div className="p-5 flex flex-col">
        <p
          className="cursor-pointer underline"
          onClick={() => setCreateUser(false)}
        >
          BACK
        </p>
        <div className="flex flex-col items-start p-3 justify-start w-full my-7">
          <label htmlFor="username">USERNAME</label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="username"
            id="username"
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={handleUsernameChange}
            required
          ></input>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="email"
            id="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
            required
          ></input>
          <label htmlFor="usercompany">USER COMPANY</label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="usercompany"
            id="usercompany"
            type="text"
            placeholder="Enter User Company"
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
            placeholder="Enter Revenue Percent"
            value={revenue}
            onChange={handleRevenueChange}
            required
          ></input>
          {emptyField && <p className="text-red-600">Fields cannot be empty</p>}
          {alreadyExists && (
            <p className="text-red-600">Email already registered with us</p>
          )}
          <div className="flex justify-center w-3/4">
            <button
              className={`mt-5 rounded-lg bg-red-600 text-white ${styles.loginButton}`}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
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

export default CreateUser;
