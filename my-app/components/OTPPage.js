import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";

const OTPPage = ({ setOtpPage, setIsLoading }) => {
  const [emailVal, setEmailVal] = useState("");
  const [otpVal, setOTPVal] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const [otpEnter, setOTPEnter] = useState(false);
  const [incorrectUser, setIncorrectUser] = useState(false);
  const [passwordVal, setPasswordVal] = useState("");
  const [newPasswordVal, setNewPasswordVal] = useState("");
  const [mismatchPassword, setMismatchPassword] = useState("");
  const [incorrectOTP, setIncorrectOTP] = useState(false);
  const [OTPTimeOut, setOTPTimeout] = useState(false);
  //   const [isLoading,setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmailVal(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordVal(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPasswordVal(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTPVal(e.target.value);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setEmptyField(false);
    setIncorrectUser(false);
    setMismatchPassword(false);
    setIncorrectOTP(false);

    if (emailVal == "") {
      setEmptyField(true);
      return;
    }

    setIsLoading(true);

    let failed = false;

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/checkEmail`, {
        email: emailVal,
      })
      .then((res) => {
        console.log("response", res);
      })
      .catch((error) => {
        console.log("error", error);
        // setEmptyField(false);
        setIncorrectUser(true);
        setIsLoading(false);
        failed = true;
        return;
      });

    if (failed) return;
    // console.log("DOOOOOOOOON");
    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/otp`, {
        email: emailVal,
      })
      .then((res) => {
        // console.log("response", res.data);
        setOTPEnter(true);
        setEmptyField(false);
        setIncorrectUser(false);
        setMismatchPassword(false);
        setIncorrectOTP(false);
        // window.sessionStorage.setItem("user", JSON.stringify(res.data));
        // window.location.href = "/home";
      })
      .catch((error) => {
        console.log("error", error);
        // setEmptyField(false);
        // setIncorrectCredential(true);
      });

    setIsLoading(false);
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();

    setEmptyField(false);
    setIncorrectUser(false);
    setMismatchPassword(false);
    setIncorrectOTP(false);
    setOTPTimeout(false);

    if (otpVal == "" || passwordVal == "" || newPasswordVal == "") {
      setEmptyField(true);
      return;
    }

    if (passwordVal !== newPasswordVal) {
      setMismatchPassword(true);
      return;
    }

    setIsLoading(true);
    let user;

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/verify`, {
        email: emailVal,
        otp: otpVal,
      })
      .then((res) => {
        // console.log("response", res.data);
        user = res.data;
        // console.log("user1", user);
        setOTPEnter(true);
        // console.log("user", user);

        const newTimeStamp = new Date().getTime();

        if (newTimeStamp > user.expireIn) {
          // console.log("entered");
          setOTPTimeout(true);
          setIsLoading(false);
          return;
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/`, {
            email: user.email,
            password: passwordVal,
          })
          .then((res) => {
            // console.log("response123", res.data);
            // user = res.data;
            // setOTPEnter(true);
            window.sessionStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/home";
          })
          .catch((error) => {
            console.log("error", error);
            setIncorrectOTP(true);
            return;
            // setEmptyField(false);
            // setIncorrectCredential(true);
          });

        setIsLoading(false);
        // window.sessionStorage.setItem("user", JSON.stringify(res.data));
        // window.location.href = "/home";
      })
      .catch((error) => {
        console.log("error", error);
        setIncorrectOTP(true);
        setIsLoading(false);
        return;
        // setEmptyField(false);
        // setIncorrectCredential(true);
      });

    if (incorrectOTP) return;
  };

  return (
    <div className={`flex flex-col p-7 ${styles.loginPage}`}>
      <div className="flex justify-end">
        <p
          className={`underline cursor-pointer text-xl mb-3 hover:text-gray-400 ${styles.registerClass}`}
          onClick={() => {
            setOtpPage(false);
            setOTPEnter(false);
          }}
        >
          Back
        </p>
      </div>
      <h2 className={`${styles.heading} text-5xl mt-20`}>Login with OTP</h2>
      {otpEnter ? (
        <>
          <p className="text-[#666] text-xl my-3">
            Check your Email. You must have recieved the OTP.
          </p>
          <div className="flex flex-col items-start p-3 justify-start w-full my-12">
            <label htmlFor="otp">ENTER OTP</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="otp"
              id="otp"
              type="text"
              value={otpVal}
              onChange={handleOTPChange}
              placeholder="Enter your OTP"
              required
            ></input>
            <label htmlFor="password">NEW PASSWORD</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="password"
              id="password"
              type="password"
              value={passwordVal}
              onChange={handlePasswordChange}
              placeholder="Enter your New Password"
              required
            ></input>
            <label htmlFor="Newpassword">CONFIRM NEW PASSWORD</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="Newpassword"
              id="Newpassword"
              type="password"
              value={newPasswordVal}
              onChange={handleNewPasswordChange}
              placeholder="Confirm your New Password"
              required
            ></input>

            {emptyField && (
              <p className="text-red-600">Please enter all details</p>
            )}
            {mismatchPassword && (
              <p className="text-red-600">Passwords don't match</p>
            )}
            {incorrectOTP && <p className="text-red-600">OTP doesn't match</p>}
            {incorrectUser && (
              <p className="text-red-600">
                Email address doesn't exist in database
              </p>
            )}
            {OTPTimeOut && (
              <p className="text-red-600">
                OTP Time out. Please resend the OTP.
              </p>
            )}
            <div className="flex justify-center w-3/4">
              <button
                className={`my-5 rounded-lg bg-blue-600 mr-3 text-white ${styles.loginButton}`}
                type="submit"
                onClick={handleSendOTP}
              >
                RESEND
              </button>
              <button
                className={`my-5 rounded-lg bg-red-600 text-white ${styles.loginButton}`}
                type="submit"
                onClick={handleSubmitOTP}
              >
                LOGIN
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-[#666] text-xl my-3">Enter your email address</p>
          <div className="flex flex-col items-start p-3 justify-start w-full my-12">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              className="border-gray-400 rounded-md border-2 my-4 w-3/4 h-11 p-3 outline-none"
              name="email"
              id="email"
              type="email"
              value={emailVal}
              onChange={handleEmailChange}
              placeholder="Enter your Email"
              required
            ></input>
            {emptyField && (
              <p className="text-red-600">Please enter email address</p>
            )}
            {incorrectUser && (
              <p className="text-red-600">
                Email address doesn't exist in database
              </p>
            )}
            <div className="flex justify-center w-3/4">
              <button
                className={`my-5 rounded-lg bg-red-600 text-white ${styles.loginButton}`}
                type="submit"
                onClick={handleSendOTP}
              >
                NEXT
              </button>
            </div>
          </div>
        </>
      )}

      {/* </div> */}
    </div>
  );
};

export default OTPPage;
