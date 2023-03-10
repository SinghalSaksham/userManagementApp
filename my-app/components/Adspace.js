import React, { useState, useEffect } from "react";
import AdCard from "./AdCard";
import styles from "../styles/Home.module.css";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { BASE_URL } from "@/pages/helper";

const Adspace = ({ selectedCard }) => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    // console.log("selectedCard", selectedCard);
    const res = await axios.get(`${BASE_URL}/ad/${selectedCard.id}`);
    setAds(res.data);
    // console.log("res.data", res.data);
    // console.log(process.env.SERVER_URL);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  //   const ads = [
  //     {
  //       website: "www.joey.com",
  //       AdRevenueDollars: 135,
  //       AdImpressions: 1500,
  //       AverageSiteTime: 13,
  //       TotalClicks: 350,
  //     },
  //     {
  //       website: "www.joey2.com",
  //       AdRevenueDollars: 120,
  //       AdImpressions: 1600,
  //       AverageSiteTime: 11,
  //       TotalClicks: 141,
  //     },
  //     {
  //       website: "www.jack.com",
  //       AdRevenueDollars: 141,
  //       AdImpressions: 1350,
  //       AverageSiteTime: 9,
  //       TotalClicks: 230,
  //     },
  //   ];
  return (
    <>
      <div className="relative">
        <div
          className={`w-full sticky top-0 left-0  flex justify-evenly rounded-lg bg-white p-4 my-3 border-b-2 border-gray-200 ${styles.card} ${styles.userSpace}`}
        >
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Website
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Ad Revenue Dollars
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Ad Impressions
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Average Site Viewing Time In Seconds
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Total Clicks
          </p>
        </div>
        {ads?.map((ad) => {
          return (
            <AdCard
              website={ad?.website}
              AdRevenueDollars={ad?.AdRevenueDollars}
              AdImpressions={ad?.AdImpressions}
              AverageSiteTime={ad?.AverageSiteTime}
              TotalClicks={ad?.TotalClicks}
              key={ad?._id}
            />
          );
        })}
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

export default Adspace;
