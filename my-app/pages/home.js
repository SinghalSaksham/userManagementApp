import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import UserTab from "@/components/UserTab.js";
import AnalyticsTab from "@/components/AnalyticsTab.js";
import UserHome from "@/components/UserHome.js";
import AnalyticsTabUser from "@/components/AnalyticsTabUser.js";
import { BASE_URL } from "./helper.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHomeTab, setIsHomeTab] = useState(true);
  const [userInfo, setUseInfo] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [data, setData] = useState([]);

  const isUserValid = async () => {
    setIsLoading(true);
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUseInfo(user);
    setSelectedCard(user);
    // console.log("userrrrrr", user);

    if (user?.token == "" || user?.token == undefined) {
      window.location.href = "/";
      return;
    }
    // console.log("userrrrr", user);

    // if (user?.email == "" || user?.password == "") {
    //   window.location.href = "/";
    //   return;
    // }

    await axios
      .post(`${BASE_URL}/user/isUserValid`, {
        token: user?.token,
      })
      .then((res) => {
        // console.log("response", res.data);
        setIsLoading(false);
        // window.sessionStorage.setItem("user", JSON.stringify(res.data));
        // window.location.href = "/home";
      })
      .catch((error) => {
        // window.location.href = "/";
        console.log("error", error);
        // setEmptyField(false);
        // setIncorrectCredential(true);
      });
  };

  useEffect(() => {
    isUserValid().catch((err) => {
      console.log(err);
    });
    // calculateData();
  }, []);

  const handleLogOut = () => {
    setIsLoading(true);
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : (
        <>
          <div className="  w-full bg-[#f4f5f7] min-h-screen">
            <Navbar
              setIsHomeTab={setIsHomeTab}
              isHomeTab={isHomeTab}
              handleLogOut={handleLogOut}
            />
            {userInfo.isAdmin ? (
              isHomeTab ? (
                <UserTab />
              ) : (
                <AnalyticsTab data={data} setData={setData} />
              )
            ) : isHomeTab ? (
              <UserHome selectedCard={selectedCard} />
            ) : (
              <AnalyticsTabUser />
            )}
            {/* {isHomeTab ? <UserTab /> : <AnalyticsTab />} */}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
