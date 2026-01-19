import React, { useContext } from "react";
import { useState } from "react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    if (!name || !email || !password) {
      return console.log("Missing Detaills");
    }

    console.log(form);

    try {
      const { data } = await axios.post(`${backendUrl}/auth/register`, { name, email, password });
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error during Authentication ${error.message}`);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return <AuthForm mode="Register" form={form} onChange={handleChange} onSubmit={register} />;
}
