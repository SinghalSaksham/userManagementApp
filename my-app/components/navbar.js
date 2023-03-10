import React, { useState } from "react";

const MobileNav = ({
  open,
  setOpen,
  setIsHomeTab,
  isHomeTab,
  handleLogOut,
}) => {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
        {" "}
        {/*logo container*/}
        <p className="text-xl font-semibold cursor-pointer">MY-APP</p>
      </div>
      <div className="flex flex-col ml-4">
        <p
          className={`text-xl ${
            isHomeTab ? "font-medium" : "font-normal"
          } my-4`}
          onClick={() => {
            setIsHomeTab(true);
            setTimeout(() => {
              setOpen(!open);
            }, 100);
          }}
          // onClick={() =>
          //   setTimeout(() => {
          //     setOpen(!open);
          //   }, 100)
          // }
        >
          Home
        </p>
        <p
          className={`text-xl ${
            !isHomeTab ? "font-medium" : "font-normal"
          } my-4`}
          onClick={() => {
            setIsHomeTab(false);
            setTimeout(() => {
              setOpen(!open);
            }, 100);
          }}
        >
          Analytics
        </p>
        <p
          className="text-xl font-normal my-4"
          onClick={() => {
            handleLogOut();
            setTimeout(() => {
              setOpen(!open);
            }, 100);
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

const Navbar = ({ setIsHomeTab, isHomeTab, handleLogOut }) => {
  const [open, setOpen] = useState(false);
  return (
    // <nav className="fixed w-full mb-3 flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
    <nav className=" flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
      <MobileNav
        open={open}
        setOpen={setOpen}
        setIsHomeTab={setIsHomeTab}
        isHomeTab={isHomeTab}
        handleLogOut={handleLogOut}
      />
      <div className="w-3/12 flex items-center">
        <p className="text-2xl font-semibold cursor-default">MY-APP</p>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex">
          <p
            className={`mx-4 ${isHomeTab ? "underline" : null} cursor-pointer`}
            onClick={() => setIsHomeTab(true)}
          >
            HOME
          </p>
          <p
            className={`mx-4 ${!isHomeTab ? "underline" : null} cursor-pointer`}
            onClick={() => setIsHomeTab(false)}
          >
            ANALYTICS
          </p>
          <p className={`mx-4 cursor-pointer`} onClick={() => handleLogOut()}>
            LOG OUT
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
