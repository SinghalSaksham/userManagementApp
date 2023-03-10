import React, { useEffect, useState } from "react";
import Userwise from "./AnalyticsData/Userwise.js";
import { CircularProgress } from "@material-ui/core";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../styles/Home.module.css";
import Websitewise from "./AnalyticsData/Websitewise.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [labelSet1, setLabelSet1] = useState([]);
  const [dataSet1, setDataSet1] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  let dataArr = [];

  // const calculateData = async () => {
  //   setIsLoading(true);

  //   const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/`);
  //   // let dataArr = [];
  //   // dataArr.push(["Username", "Revenue in Dollars"]);

  //   res.data.forEach(async (user) => {
  //     const ads = await axios.get(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/ad/${user._id}`
  //     );

  //     let revenue = 0;

  //     ads.data.forEach((ad) => {
  //       revenue +=
  //         (parseInt(ad?.AdRevenueDollars) * parseInt(user?.revenuePercent)) /
  //         100;
  //       console.log(user.name, revenue);
  //     });

  //     // console.log("adddd", user);

  //     // setData(...data, { name: user.name, value: revenue });
  //     // dataArr.push({ name: user.name, value: revenue });
  //     // dataArr([user.name, revenue]);
  //     dataArr.push([user.name, revenue]);
  //     // dataArr = [...dataArr, [user.name, revenue]];
  //     // console.log(dataArr);
  //     // setData((oldData) => [...oldData, [user.name, revenue]]);
  //     // setArray(oldArray => [...oldArray,newValue] );
  //   });

  //   // data = dataArr;
  //   setData([...data, dataArr]);
  //   // data = dataArr;
  //   // console.log("dataArr", dataArr);
  //   // console.log(process.env.SERVER_URL);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/`;
  //     let dataset = [];
  //     await fetch(url)
  //       .then((data) => {
  //         console.log("API DATA", data);
  //         const res = data.json();
  //         return res;
  //       })
  //       .then((res) => {
  //         console.log("ressss", res);
  //         res.forEach((item) => {
  //           const url1 = `${process.env.NEXT_PUBLIC_SERVER_URL}/ad/${item._id}`;
  //           fetch(url1)
  //             .then((data) => {
  //               // console.log("Individual DATA", data);
  //               const res1 = data.json();
  //               return res1;
  //             })
  //             .then((res1) => {
  //               // console.log("ressss", res);
  //               let revenue = 0;
  //               res1.forEach((ad) => {
  //                 revenue +=
  //                   (parseInt(ad?.AdRevenueDollars) *
  //                     parseInt(item?.revenuePercent)) /
  //                   100;
  //                 // console.log(user.name, revenue);
  //               });
  //               dataset.push(revenue);
  //               console.log("revueeeeeeeeeeeeeeeeee", dataset);
  //               console.log("revenue", revenue, item.name);
  //               return dataset;
  //               // setDataSet1(dataset);
  //             })
  //             .then((dataset) => {
  //               // setDataSet1(dataset);
  //               // console.log("abb to aaja", dataset, dataset.length);
  //               const temp = [];
  //               for (const val of dataset) {
  //                 temp.push(val);
  //               }
  //               setDataSet1(temp);
  //             })
  //             .catch((err) => {
  //               console.log("error", err);
  //             });
  //         });
  //         console.log("dataseeeeeeeee", dataset, dataset.length);
  //         const labelset = [];
  //         for (const val of res) {
  //           labelset.push(val.name);
  //         }

  //         // console.log("dataset", dataset);
  //         console.log("labelset", labelset);
  //         // setDataSet1(dataset);
  //         setLabelSet1(labelset);

  //         // console.log("dataset", dataset);
  //       })
  //       .catch((err) => {
  //         console.log("error", err);
  //       });
  //   };

  //   fetchData();
  //   // calculateData();
  // }, []);

  return (
    <>
      <div
        className={`p-2 flex h-full flex-wrap justify-around ${styles.analyticsTab} bg-white`}
      >
        {/* }) */}
        <Userwise />
        <Websitewise />
        {/* <Stats /> */}
        {/* <Userwise />
        <Userwise /> */}
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

export default AnalyticsTab;
