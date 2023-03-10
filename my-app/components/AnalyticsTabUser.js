import React, { useEffect, useState } from "react";
import Adwise from "./AnalyticsDataUser/Adwise.js";
import { CircularProgress } from "@material-ui/core";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../styles/Home.module.css";
import Impressionwise from "./AnalyticsDataUser/Impressionwise.js";
import Timewise from "./AnalyticsDataUser/Timewise.js";
import Clickwise from "./AnalyticsDataUser/Clickwise.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsTabUser = () => {
  return (
    <>
      <div
        className={`p-2 flex h-full flex-wrap justify-around ${styles.analyticsTab} bg-white`}
      >
        <Adwise />
        <Impressionwise />
        <Timewise />
        <Clickwise />

        {/* <Adwise /> */}
      </div>
    </>
  );
};

export default AnalyticsTabUser;
