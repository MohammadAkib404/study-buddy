import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ArrowRight } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const { userData, setUserData, backendUrl, isLoggedIn, setIsLoggedIn } =
    useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/logout`);
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const verifyEmail = async () => {
    navigate("/verify-email");
    const {data} = await axios.post(`${backendUrl}/auth/send-verify-otp`);
    console.log(data);
  }

  return isLoggedIn ? (
    <div className="relative flex justify-center items-center bg-teal-500 rounded-full size-10 text-white font-semibold mx-3 group">
      <span>{userData ? userData.name[0].toUpperCase() : "No"}</span>
      <div className="flex-col items-start absolute top-10 right-5 p-3 w-max bg-red-500 space-y-1 hidden group-hover:flex">
        <button onClick={logout}>Logout</button>
        {!userData.isAccountVerified && <button onClick={verifyEmail}>Verify Email</button>}
      </div>
    </div>
  ) : (
    <button
      onClick={() => navigate("/register")}
      className="flex gap-2 bg-brand text-white font-bold px-4 py-2 rounded-lg mx-4"
      >
      <p className="w-max"> Sign Up</p>
      <ArrowRight />
    </button>
  );
}
