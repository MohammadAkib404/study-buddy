import React, { useContext } from "react";
import { useState } from "react";
import { login } from "../Api/auth";
import AuthForm from "../Components/AuthForm";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const {setIsLoggedIn, getUserData} = useContext(AppContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      return console.log("Missing Detaills");
    }

    try {
      const { data } = await login({ email, password });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error during Authentication ${error.message}`);
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
      onSubmit={handleSubmit}
    />
    // <section className='h-screen pt-30 bg-gray-200 flex justify-center'>
    //   <form className='bg-gray-50 w-6/10 h-max flex flex-col gap-8 p-12 rounded-xl'>

    //     <h1 className='text-3xl font-bold mb-12'>Create Account</h1>

    //     <input type="email" name='email' placeholder='Email address' value={form.email} onChange={handleChange} required className='border border-border px-5 py-3 rounded-lg' />
    //     <input type="password" name='password' placeholder='Password' value={form.password} onChange={handleChange} required className='border border-border px-5 py-3 rounded-lg'/>

    //     <button onClick={handleSubmit} className='bg-brand text-xl text-base font-semibold p-3 rounded-lg mt-10'>Sign Up</button>

    //     <p>
    //       <span className='text-muted'>Already have an account? </span>
    //       <a className='text-brand underline'>Log In</a>
    //       </p>

    //   </form>
    // </section>
  );
}
