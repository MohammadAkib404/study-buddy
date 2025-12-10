import React, { useContext } from 'react'
import { useState } from 'react'
import { register } from '../Api/auth'
import AuthForm from '../Components/AuthForm'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function Register() {

  const navigate = useNavigate();

  const {setIsLoggedIn, getUserData} = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email, password} = form;

    if(!name || !email || !password){
      return console.log('Missing Detaills');
    }

    try {
    const {data} = await register({name, email, password});

    if(data.success){
      setIsLoggedIn(true);
      getUserData();
      navigate("/")
    }else{
      toast.error(data.message);
    }
      
    } catch (error) {
      console.log(`Error during Authentication ${error.message}`);
    }

  }

  const handleChange = (e) => {
      setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
  }

  return (
    <AuthForm
      mode="Register"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}
