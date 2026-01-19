import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import OTPInput from "./OTPInput";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContext);

  const [state, setState] = useState("Email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState(Array(6).fill(""));

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
  };

  const generateOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please Enter Email");
    }
    setState("OTP");
    const { data } = await axios.post(`${backendUrl}/auth/send-reset-otp`, {
      email,
    });
    data.success ? toast.success(data.message) : toast.error(data.message);
    console.log(data);
  };

  const checkOTP = async () => {
    const resetOtp = OTP.join("");
    setState("Password");
    const { data } = await axios.post(`${backendUrl}/auth/verify-reset-otp`, {
      email,
      resetOtp,
    });
    data.success ? toast.success(data.message) : toast.error(data.message);
    console.log(data);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error("Your Password is required");
    } else if (password.length < 2) {
      return toast.error("Your Password is extremly weak");
    } else if (password.length < 5) {
      return toast.info("Your Password is weak!");
    } else if (password.length < 7) {
      toast.success("Your password is good!");
    } else {
      toast.success("Your Password is strong!");
    }

    const resetOtp = OTP.join("");
    const newPassword = password;

    const { data } = await axios.post(`${backendUrl}/auth/reset-password`, {
      email,
      resetOtp,
      newPassword,
    });
    data.success ? toast.success(data.message) : toast.error(data.message);
    console.log(data);
    navigate("/");
  };

  return (
    <>
      {state === "Email" && (
        <section className="h-screen pt-30 bg-gray-200 flex justify-center">
          <form className="bg-gray-50 w-6/10 h-max flex flex-col gap-8 p-10 rounded-xl">
            <h1 className="text-3xl text-center font-bold">Reset Password</h1>
            <p className="text-center ">Enter your registered Email address.</p>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
              required
              className="border border-border px-5 py-3 rounded-lg"
            />

            <button onClick={generateOTP} className="bg-brand text-xl text-bg font-semibold p-3 rounded-lg">
              Submit
            </button>
          </form>
        </section>
      )}

      {state === "OTP" && (
        <section className="flex justify-center pt-30 w-full h-screen bg-gray-200">
          <div className="bg-gray-50 h-max p-10 rounded-2xl space-y-4">
            <h1 className="text-center text-3xl font-bold">Reset Password OTP</h1>
            <p className="mb-8 text-muted">Enter the 6-digit code sent to your Email id.</p>
            <OTPInput input={OTP} setInput={setOTP} proceed={checkOTP} />
          </div>
        </section>
      )}

      {state === "Password" && (
        <section className="h-screen pt-30 bg-gray-200 flex justify-center">
          <form className="bg-gray-50 w-6/10 h-max flex flex-col gap-8 p-10 rounded-xl">
            <h1 className="text-3xl text-center font-bold">New Password</h1>
            <p className="text-center ">Enter your new password.</p>
            <input
              type="password"
              name="password"
              placeholder="New password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="border border-border px-5 py-3 rounded-lg"
            />

            <button onClick={changePassword} className="bg-brand text-xl text-bg font-semibold p-3 rounded-lg">
              Submit
            </button>
          </form>
        </section>
      )}
    </>
  );
}
