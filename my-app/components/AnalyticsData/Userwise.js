import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PieChart from "../Charts/PieChart.js";
import styles from "../../styles/Home.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Userwise = () => {
  const [labelSet1, setLabelSet1] = useState([]);
  const [dataSet1, setDataSet1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/`;
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
                let revenue = 0;
                for (const val of res1) {
                  revenue +=
                    (parseInt(val?.AdRevenueDollars) *
                      parseInt(item?.revenuePercent)) /
                    100;
                }
                // res1.forEach((ad) => {
                //   revenue +=
                //     (parseInt(ad?.AdRevenueDollars) *
                //       parseInt(item?.revenuePercent)) /
                //     100;
                //   // console.log(user.name, revenue);
                // });

                // dataset.push(revenue);

                //   console.log("revueeeeeeeeeeeeeeeeee", dataset);
                //   console.log("revenue", revenue, item.name);

                // return dataset;

                return revenue;
              })
              .then((revenue) => {
                dataset.push(revenue);
                labelset.push(item.name);
                // console.log("revenue", revenue, item.name);

                // setDataSet1(dataset);
                // console.log("aaaaaaaaaaaaaaaaaa", dataset, dataset.length);
                const temp = [];
                for (const val of dataset) {
                  temp.push(val);
                }
                setDataSet1(temp);
                setLabelSet1(labelset);
              })
              .catch((err) => {
                console.log("error", err);
              });
          });
          // console.log("dataseeeeeeeee", dataset, dataset.length);
          //   const labelset = [];
          //   for (const val of res) {
          //     labelset.push(val.name);
          //   }

          //   console.log("dataset", dataset);
          // console.log("labelset", labelset);
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
      <h3 className="text-center w-full">Revenue Userwise in Dollars</h3>
      <div className="w-full h-3/5 ">
        <PieChart
          labelSet={labelSet1}
          dataSet={dataSet1}
          title={"Revenue in Dollars"}
        />
      </div>
      <div className="flex flex-col w-full h-1/5">
        <h3 className="my-5 text-xl font-semibold">Status</h3>
        <div className="flex flex-col">
          <div className="flex justify-around my-3">
            <p className="text-lg font-normal w-1/2">Total Revenue</p>
            <p className="text-lg font-normal w-1/2">
              $
              {dataSet1.reduce((x, y) => {
                return x + y;
              }, 0)}
            </p>
          </div>
          <div className="flex justify-around my-3">
            <p className="text-lg font-normal w-1/2">
              Maximum Revenue Generating User
            </p>
            <p className="text-lg font-normal w-1/2">
              {labelSet1[dataSet1.indexOf(Math.max(...dataSet1))]}
            </p>
          </div>
          <div className="flex justify-around my-3">
            <p className="text-lg font-normal w-1/2">
              Maximum Revenue from a User
            </p>
            <p className="text-lg font-normal w-1/2">
              ${Math.max(...dataSet1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userwise;
