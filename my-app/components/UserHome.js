import React, { useEffect, useState } from "react";
import Adspace from "./Adspace";
import styles from "../styles/Home.module.css";
import CreateAd from "./CreateAd";

const UserHome = ({ selectedCard }) => {
  const [showCreateAd, setShowCreateAd] = useState(false);
  //   const [selectedCard, setSelectedCard] = useState({});

  //   useEffect(() => {
  //     const userInfo = JSON.parse(sessionStorage.getItem("user"));
  //     setSelectedCard({ id: userInfo.id });
  //     console.log("userid", userInfo.id);
  //     console.log("userid", selectedCard);
  //   }, []);

  const handleCreateAd = () => {
    setShowCreateAd(true);
  };
  return (
    <>
      <div className="p-5 flex flex-col">
        {showCreateAd ? (
          <CreateAd
            setShowCreateAd={setShowCreateAd}
            selectedCard={selectedCard}
          />
        ) : (
          <>
            <div className="flex justify-end ">
              <button
                className={`bg-[#1F3BB3] rounded-xl text-white py-3 px-2 w-44 ${styles.CreateUserTab}`}
                onClick={handleCreateAd}
              >
                + Create Ad
              </button>
            </div>

            <div className="w-full h-96 rounded-lg my-5 overflow-hidden ">
              <div className="w-full h-full bg-white rounded-lg overflow-y-scroll">
                <Adspace selectedCard={selectedCard} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserHome;
