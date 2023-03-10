import React from "react";
import styles from "../styles/Home.module.css";

const UserCard = ({
  id,
  name,
  email,
  company,
  isActive,
  revenuePercent,
  setSelectedCard,
  setEditUserCard,
  setShowUserAd,
}) => {
  const handleEdit = () => {
    // console.log("Clicked");
    setEditUserCard(true);
    setSelectedCard({ name, email, company, isActive, revenuePercent, id });
  };

  const handleUsernameClick = () => {
    setShowUserAd(true);
    setSelectedCard({ name, email, company, isActive, revenuePercent, id });
  };
  return (
    <>
      <div
        className={`w-full flex justify-evenly rounded-lg bg-white p-4 my-3 border-b-2 border-gray-200 ${styles.card} ${styles.wideUserCard}`}
      >
        <p
          className={`cursor-default w-1/5 text-center ${styles.userCard} underline cursor-pointer`}
          onClick={handleUsernameClick}
        >
          {name}
        </p>
        <p className={`cursor-default w-1/5 text-center ${styles.userCard}`}>
          {email}
        </p>
        <p className={`cursor-default w-1/5 text-center ${styles.userCard}`}>
          {company}
        </p>
        <p
          className={`cursor-default w-1/5 text-center ${styles.userCard} ${
            isActive ? `text-green-600` : `text-red-600`
          }`}
        >
          {isActive ? `Active` : `Inactive`}
        </p>
        <p className={`cursor-default w-[10%] text-center ${styles.userCard}`}>
          {revenuePercent}
        </p>
        <img
          src="/assets/editIcon.png"
          className="cursor-pointer"
          onClick={handleEdit}
        />
      </div>
      <div
        className={`w-full flex justify-evenly rounded-lg bg-white p-4 my-3 border-b-2 border-gray-200 ${styles.card} ${styles.medUserCard}`}
      >
        <div className="flex justify-end">
          <img
            src="/assets/editIcon.png"
            className="cursor-pointer w-7"
            onClick={handleEdit}
          />
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3] underline`}
            onClick={handleUsernameClick}
          >
            Name:
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {name}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            Email:
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {email}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            Company:
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {company}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            status:
          </p>
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} ${
              isActive ? `text-green-600` : `text-red-600`
            }`}
          >
            {isActive ? `Active` : `Inactive`}
          </p>
        </div>
        <div className="flex">
          <p
            className={`cursor-default w-1/2 text-center ${styles.userCard} text-[#A3A3A3]`}
          >
            Revenue Percent:
          </p>
          <p className={`cursor-default w-1/2 text-center ${styles.userCard}`}>
            {" "}
            {revenuePercent}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
