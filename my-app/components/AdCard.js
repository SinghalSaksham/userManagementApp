import React from "react";
import styles from "../styles/Home.module.css";

const AdCard = ({
  website,
  AdRevenueDollars,
  AdImpressions,
  AverageSiteTime,
  TotalClicks,
}) => {
  return (
    <>
      <div
        className={`w-full flex justify-evenly rounded-lg bg-white p-4 my-3 border-b-2 border-gray-200 ${styles.card} ${styles.wideUserCard}`}
      >
        <p
          className={`cursor-default w-1/5 text-center ${styles.userCard} cursor-pointer`}
        >
          {website}
        </p>
        <p className={`cursor-default w-1/5 text-center ${styles.userCard}`}>
          {AdRevenueDollars}
        </p>
        <p className={`cursor-default w-1/5 text-center ${styles.userCard}`}>
          {AdImpressions}
        </p>
        <p className={`cursor-default w-1/5 text-center ${styles.userCard}`}>
          {AverageSiteTime}
        </p>

        <p className={`cursor-default w-[10%] text-center ${styles.userCard}`}>
          {TotalClicks}
        </p>
      </div>
      <div
        className={`w-full flex justify-evenly rounded-lg bg-white p-4 my-3 border-b-2 border-gray-200 ${styles.card} ${styles.medUserCard}`}
      >
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            website:
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {website}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            AdRevenueDollars :
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {AdRevenueDollars}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            AdImpressions :
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {AdImpressions}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            AverageSiteTime(in sec) :
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {AverageSiteTime}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            Total Clicks:
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {TotalClicks}
          </p>
        </div>
      </div>
    </>
  );
};

export default AdCard;
