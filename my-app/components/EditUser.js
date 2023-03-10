import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { BASE_URL } from "@/pages/helper";

const EditUser = ({ selectedCard, setEditCardUser }) => {
  const path = selectedCard?.isActive
    ? "/assets/toggle-on.png"
    : "/assets/toggle-off.png";

  const val = selectedCard?.isActive ? true : false;
  const initialStatus = selectedCard?.isActive ? `Active` : `Inactive`;

  const [username, setUsername] = useState(selectedCard.name);
  const [company, setCompany] = useState(selectedCard.company);
  const [revenue, setRevenue] = useState(selectedCard.revenuePercent);
  const [emptyField, setEmptyField] = useState(false);
  const [image, setImage] = useState(path);
  const [toggleOn, setToggleOn] = useState(val);
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    if (toggleOn) {
      setToggleOn(false);
      setImage("/assets/toggle-off.png");
      setStatus("Inactive");
    } else {
      setToggleOn(true);
      setImage("/assets/toggle-on.png");
      setStatus("Active");
    }
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

  const handleSave = async (e) => {
    e.preventDefault();
    setEmptyField(false);

    if (username == "" || revenue == "" || company == "") {
      setEmptyField(true);
      return;
    }
    setIsLoading(true);

    await axios
      .put(`${BASE_URL}/user/edit`, {
        name: username,
        company,
        revenuePercent: revenue,
        _id: selectedCard.id,
        isActive: toggleOn,
      })
      .then((res) => {
        console.log("response", res.data.status);
        // window.sessionStorage.setItem("user", JSON.stringify(res.data));
        setEditCardUser(false);
        // window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("selectedCard", selectedCard);
  }, []);

  return (
    <>
      <div className="p-5 flex flex-col">
        <p
          className="cursor-pointer underline"
          onClick={() => setEditCardUser(false)}
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
          <div className="flex">
            <label className="mr-3">Status:</label>
            <img
              src={image}
              className="mx-3 cursor-pointer"
              onClick={handleToggle}
            />
            <p className="cursor-default mx-3">{status}</p>
          </div>
          {emptyField && <p className="text-red-600">Fields cannot be empty</p>}

          <div className="flex justify-center w-3/4">
            <button
              className={`mt-5 rounded-lg bg-red-600 text-white ${styles.loginButton}`}
              type="submit"
              onClick={handleSave}
            >
              Save
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

export default EditUser;
