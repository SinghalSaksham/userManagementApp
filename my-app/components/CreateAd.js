import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

const CreateAd = ({ setShowCreateAd, selectedCard }) => {
  const [website, setWebsite] = useState("");
  const [adRevenue, setAdRevenue] = useState("");
  const [adImpression, setAdImpression] = useState("");
  const [avgTime, setAvgTime] = useState("");
  const [clicks, setClicks] = useState("");

  const [emptyField, setEmptyField] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handleAdRevenueChange = (e) => {
    setAdRevenue(e.target.value);
  };

  const handleAdImpressionChange = (e) => {
    setAdImpression(e.target.value);
  };

  const handleAvgTimeChange = (e) => {
    setAvgTime(e.target.value);
  };

  const handleClickChange = (e) => {
    setClicks(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyField(false);

    // console.log("efffff", selectedCard);

    if (
      website == "" ||
      adRevenue == "" ||
      adImpression == "" ||
      avgTime == "" ||
      clicks == ""
    ) {
      setEmptyField(true);
      return;
    }
    setIsLoading(true);

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/ad/`, {
        website,
        AdRevenueDollars: adRevenue,
        AdImpressions: adImpression,
        AverageSiteTime: avgTime,
        TotalClicks: clicks,
        userId: selectedCard.id,
      })
      .then((res) => {
        // console.log("response", res.data.status);
        // window.sessionStorage.setItem("user", JSON.stringify(res.data));
        setShowCreateAd(false);
        // window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
        // setIncorrectCredential(true);
      });

    setIsLoading(false);
  };
  return (
    <>
      <div className="p-1 flex flex-col">
        <p
          className="cursor-pointer underline"
          onClick={() => setShowCreateAd(false)}
        >
          BACK
        </p>
        <div className="flex flex-col items-start p-2 justify-start w-full my-1">
          <label htmlFor="website">WEBSITE</label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="website"
            id="website"
            type="text"
            placeholder="Enter website"
            value={website}
            onChange={handleWebsiteChange}
            required
          ></input>
          <label htmlFor="adRevenue">AD REVENUE IN DOLLARS</label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="adRevenue"
            id="adRevenue"
            type="text"
            placeholder="Enter Ad Revenue"
            value={adRevenue}
            onChange={handleAdRevenueChange}
            required
          ></input>
          <label htmlFor="adImpressions">AD IMPRESSIONS</label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="adImpressions"
            id="adImpressions"
            type="text"
            placeholder="Enter Ad Impressions"
            value={adImpression}
            onChange={handleAdImpressionChange}
            required
          ></input>
          <label htmlFor="adViewingTime">
            AVERAGE SITE VIEWING TIME IN SECONDS
          </label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="adViewingTime"
            id="adViewingTime"
            type="text"
            placeholder="Enter Average Viewing Time"
            value={avgTime}
            onChange={handleAvgTimeChange}
            required
          ></input>
          <label htmlFor="clicks">Total Clicks</label>
          <input
            className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
            name="clicks"
            id="clicks"
            type="text"
            placeholder="Enter Total Clicks"
            value={clicks}
            onChange={handleClickChange}
            required
          ></input>
          {emptyField && <p className="text-red-600">Fields cannot be empty</p>}
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

export default CreateAd;
