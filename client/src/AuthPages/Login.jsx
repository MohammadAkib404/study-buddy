import React, { useContext } from "react";
import { useState } from "react";
import AuthForm from "../Components/AuthForm";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      return console.log("Missing Detaills");
    }

    try {
      const { data } = await axios.post(`${backendUrl}/login`, {email, password});

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error during Authentication ${error}`);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(form);
  };

  return (
    <AuthForm
      mode="Login"
      form={form}
      onChange={handleChange}
      onSubmit={login}
    />
  );
}
