import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PieChart from "../Charts/PieChart.js";
import styles from "../../styles/Home.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Websitewise = () => {
  const [labelSet1, setLabelSet1] = useState([]);
  const [dataSet1, setDataSet1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/`;
      let dataset = [],
        labelset = [];
      await fetch(url)
        .then((data) => {
          const res = data.json();
          return res;
        })
        .then((res) => {
          res.forEach((item) => {
            const url1 = `${process.env.NEXT_PUBLIC_SERVER_URL}/ad/${item._id}`;
            // console.log("item", item.name);
            fetch(url1)
              .then((data) => {
                // console.log("Individual DATA", data);
                const res1 = data.json();
                return res1;
              })
              .then((res1) => {
                // console.log("ressss", res);
                for (const val of res1) {
                  dataset.push(
                    (Number(val?.AdRevenueDollars) *
                      Number(item?.revenuePercent)) /
                      100
                  );

                  labelset.push(val?.website);
                }

                // console.log("DAAAAAAAAAAA", dataset);
                // console.log("LLLL", labelset);
                for (const val of dataset) temp.push(val);
                setDataSet1(temp);
                // setDataSet1(dataset);
                setLabelSet1(labelset);
              })
              .catch((err) => {
                console.log("error", err);
              });

            let temp = [];

            // for (const val of dataset) temp.push(val);
            // setDataSet1(temp);
            // setLabelSet1(labelset);
          });
          // console.log("DATASETDATASET", dataset, labelset);
          //   const labelset = [];
          //   for (const val of res) {
          //     labelset.push(val.name);
          //   }

          //   console.log("dataset", dataset);
          // console.log("labelsetttttt", labelset);
          // setDataSet1(dataset);
          //   setLabelSet1(labelset);

          // console.log("dataset", dataset);
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
      <h3 className="text-center">Revenue Website wise in Dollars</h3>
      <PieChart
        labelSet={labelSet1}
        dataSet={dataSet1}
        title={"Revenue in Dollars"}
      />
      <h3 className="my-5 text-xl font-semibold">Status</h3>
      <div className="flex flex-col my-3">
        <div className="flex justify-around">
          <p className="text-lg font-normal w-1/2">
            Maximum Revenue Generating Website
          </p>
          <p className="text-lg font-normal w-1/2">
            {labelSet1[dataSet1.indexOf(Math.max(...dataSet1))]}
          </p>
        </div>
        <div className="flex justify-around my-3">
          <p className="text-lg font-normal w-1/2">
            Maximum Revenue from a website
          </p>
          <p className="text-lg font-normal w-1/2">${Math.max(...dataSet1)}</p>
        </div>
      </div>
    </div>
  );
};

export default Websitewise;
