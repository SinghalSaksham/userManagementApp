import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import UserAd from "./UserAd";
import UserCard from "./UserCard";
import UserSpace from "./UserSpace";

const UserTab = () => {
  const [image, setImage] = useState("/assets/toggle-off.png");
  const [image1, setImage1] = useState("/assets/toggle-off.png");
  const [showActive, setShowActive] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [editUserCard, setEditUserCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [createUser, setCreateUser] = useState(false);
  const [showUserAd, setShowUserAd] = useState(false);

  const handleActive = () => {
    if (!showActive) {
      if (showInactive) handleInactive();
      setShowActive(true);
      setImage("/assets/toggle-on.png");
    } else {
      setShowActive(false);
      setImage("/assets/toggle-off.png");
    }
  };

  const handleInactive = () => {
    if (!showInactive) {
      if (showActive) handleActive();
      setShowInactive(true);
      setImage1("/assets/toggle-on.png");
    } else {
      setShowInactive(false);
      setImage1("/assets/toggle-off.png");
    }
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCreateUser = () => {
    setCreateUser(true);
  };

  return (
    <>
      {editUserCard ? (
        <EditUser
          selectedCard={selectedCard}
          setEditCardUser={setEditUserCard}
        />
      ) : createUser ? (
        <CreateUser setCreateUser={setCreateUser} />
      ) : showUserAd ? (
        <UserAd setShowUserAd={setShowUserAd} selectedCard={selectedCard} />
      ) : (
        <div className="p-5 flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold cursor-default">
              Users Details
            </h2>
          </div>
          <div className="flex flex-wrap justify-between my-3">
            <input
              className={`bg-white border-gray-400 rounded-md border-2 ${styles.searchTab} p-2 outline-none`}
              type="text"
              placeholder="Search by Name or Email"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div
              className={`flex justify-between bg-gray-100 rounded-md ${styles.filterTab} p-4`}
            >
              <div className="flex">
                <img
                  src={image}
                  onClick={handleActive}
                  className="mx-1 cursor-pointer w-8"
                />
                <p className="cursor-default mx-1">Active Users</p>
              </div>
              <div className="flex">
                <img
                  src={image1}
                  onClick={handleInactive}
                  className="mx-1 cursor-pointer w-8"
                />
                <p className="cursor-default mx-1">Inactive Users</p>
              </div>
            </div>
            <button
              className={`bg-[#1F3BB3] rounded-xl text-white py-3 px-2 w-44 ${styles.CreateUserTab}`}
              onClick={handleCreateUser}
            >
              + Create User
            </button>
          </div>
          <div className="w-full h-96 rounded-lg my-5 overflow-hidden ">
            <div className="w-full h-full bg-white rounded-lg overflow-y-scroll">
              <UserSpace
                searchInput={searchInput}
                showActive={showActive}
                showInactive={showInactive}
                setSelectedCard={setSelectedCard}
                setEditUserCard={setEditUserCard}
                setShowUserAd={setShowUserAd}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTab;
