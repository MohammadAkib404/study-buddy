import React, { useContext, useState } from "react";
import OTPInput from "./OTPInput";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const { backendUrl } = useContext(AppContext);

  const [input, setInput] = useState(Array(6).fill(""));

  const verifyEmail = async () => {
    const otp = input.join("");
    console.log(otp);
    const { data } = await axios.post(`${backendUrl}/auth/verify-account`, { otp });
    data.success ? toast.info(data.message) : toast.error(data.message);
    console.log(data);
  };

  return (
    <section className="flex justify-center pt-30 w-full h-screen bg-gray-200">
      <div className="bg-gray-50 h-max p-10 rounded-2xl space-y-4">
        <h1 className="text-center text-3xl font-bold">Email Verify OTP</h1>
        <p className="mb-8 text-muted">Enter the 6-digit code sent to your Email id.</p>
        <OTPInput input={input} setInput={setInput} proceed={verifyEmail} />
      </div>
    </section>
  );
}
