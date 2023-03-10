import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PieChart from "../Charts/PieChart.js";
import styles from "../../styles/Home.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Timewise = () => {
  const [labelSet1, setLabelSet1] = useState([]);
  const [dataSet1, setDataSet1] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const id = userInfo.id;

    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/ad/${id}`;
      let dataset = [],
        labelset = [];
      await fetch(url)
        .then((data) => {
          // console.log("API DATA", data);
          const res = data.json();
          return res;
        })
        .then((res) => {
          // console.log("ressss", res);

          for (const val of res) {
            dataset.push(val.AverageSiteTime);
            labelset.push(val.website);
          }

          setDataSet1(dataset);
          setLabelSet1(labelset);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    fetchData();
    // calculateData();
  }, []);
  return (
    <div
      className={`flex flex-col w-1/2  min-h-screen my-5 ${styles.pieChartContainer}`}
    >
      <h3 className="text-center w-full">
        Average Site Viewing Time in Seconds
      </h3>
      <div className="w-full h-3/5 ">
        <PieChart
          labelSet={labelSet1}
          dataSet={dataSet1}
          title={"Ad Impressions"}
        />
      </div>
      <div className="flex flex-col w-full h-1/5">
        <h3 className="my-5 text-xl font-semibold">Status</h3>
        <div className="flex flex-col">
          <div className="flex justify-around my-3">
            <p className="text-lg font-normal w-1/2">Total Avg. Site Time</p>
            <p className="text-lg font-normal w-1/2">
              {dataSet1.reduce((x, y) => {
                return x + y;
              }, 0)}{" "}
              sec
            </p>
          </div>
          <div className="flex justify-around my-3">
            <p className="text-lg font-normal w-1/2">
              Maximum Avg Site Time Generating Website
            </p>
            <p className="text-lg font-normal w-1/2">
              {labelSet1[dataSet1.indexOf(Math.max(...dataSet1))]}
            </p>
          </div>
          <div className="flex justify-around my-3">
            <p className="text-lg font-normal w-1/2">
              Maximum Avg Site Time from a website
            </p>
            <p className="text-lg font-normal w-1/2">
              {Math.max(...dataSet1)} sec
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timewise;
