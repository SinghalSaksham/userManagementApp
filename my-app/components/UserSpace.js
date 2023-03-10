import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { BASE_URL } from "@/pages/helper";

const UserSpace = ({
  searchInput,
  showActive,
  showInactive,
  setSelectedCard,
  setEditUserCard,
  setShowUserAd,
}) => {
  // const users = [
  //   {
  //     name: "Saksham Singhal",
  //     email: "singhalsaksham.mzn@gmail.com",
  //     company: "dev.io",
  //     isActive: true,
  //     revenuePercent: 12,
  //   },
  //   {
  //     name: "Saksham Singhal",
  //     email: "singhalsaksham.mzn@gmail.com",
  //     company: "dev.io",
  //     isActive: true,
  //     revenuePercent: 12,
  //   },
  //   {
  //     name: "Samaksh Singhal",
  //     email: "ssingermzn@gmail.com",
  //     company: "tech.io",
  //     isActive: true,
  //     revenuePercent: 15,
  //   },
  //   {
  //     name: "Pranav Gupta",
  //     email: "pranav@gmail.com",
  //     company: "ai.io",
  //     isActive: true,
  //     revenuePercent: 10,
  //   },
  //   {
  //     name: "Manas Aggrawal",
  //     email: "manas@gmail.com",
  //     company: "Rise Tech",
  //     isActive: false,
  //     revenuePercent: 20,
  //   },
  //   {
  //     name: "Saksham Singhal",
  //     email: "singhalsaksham.mzn@gmail.com",
  //     company: "dev.io",
  //     isActive: true,
  //     revenuePercent: 12,
  //   },
  //   {
  //     name: "Saksham Singhal",
  //     email: "singhalsaksham.mzn@gmail.com",
  //     company: "dev.io",
  //     isActive: true,
  //     revenuePercent: 12,
  //   },
  //   {
  //     name: "Samaksh Singhal",
  //     email: "ssingermzn@gmail.com",
  //     company: "tech.io",
  //     isActive: true,
  //     revenuePercent: 15,
  //   },
  //   {
  //     name: "Pranav Gupta",
  //     email: "pranav@gmail.com",
  //     company: "ai.io",
  //     isActive: true,
  //     revenuePercent: 10,
  //   },
  //   {
  //     name: "Manas Aggrawal",
  //     email: "manas@gmail.com",
  //     company: "Rise Tech",
  //     isActive: false,
  //     revenuePercent: 20,
  //   },
  // ];

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const email = storedInfo.email;
  const getData = async () => {
    setIsLoading(true);

    const res = await axios.get(`${BASE_URL}/user/`);
    setUsers(res.data);

    const storedInfo = JSON.parse(sessionStorage.getItem("user"));
    setEmail(storedInfo.email);
    // console.log("res.data", res.data);
    // console.log(process.env.SERVER_URL);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => console.log(process.env.NEXT_PUBLIC_SERVER_URL), []);

  return (
    <>
      <div className="relative">
        <div
          className={`w-full sticky top-0 left-0  flex justify-evenly rounded-lg bg-white p-4 my-3 border-b-2 border-gray-200 ${styles.card} ${styles.userSpace}`}
        >
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Name
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Email
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Company
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            Status
          </p>
          <p className="cursor-default text-[#A3A3A3] w-1/5 text-center">
            RevenuePercent
          </p>
        </div>
        {users
          ?.filter(
            (item) =>
              (item?.name?.toLowerCase()?.includes(searchInput.toLowerCase()) ||
                item?.email
                  ?.toLowerCase()
                  ?.includes(searchInput.toLowerCase())) &&
              ((!showActive && !showInactive) ||
                (showActive && item?.isActive) ||
                (showInactive && item?.isActive == false)) &&
              item?.email != email
          )
          ?.map((user) => {
            return (
              <UserCard
                key={user._id}
                id={user._id}
                name={user.name}
                email={user.email}
                company={user.company}
                isActive={user.isActive}
                revenuePercent={user.revenuePercent}
                setSelectedCard={setSelectedCard}
                setEditUserCard={setEditUserCard}
                setShowUserAd={setShowUserAd}
              />
            );
          })}
        {/* <UserCard
        name={users[0].name}
        email={users[0].email}
        company={users[0].company}
        isActive={users[0].isActive}
        revenuePercent={users[0].revenuePercent}
      /> */}
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

export default UserSpace;
