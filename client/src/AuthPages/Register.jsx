import React from 'react'
import { useState } from 'react'
import { register } from '../Api/auth'
import AuthForm from '../Components/AuthForm'

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const {name, email, password} = form;
    if(!form.name || !form.email || !form.password){
      return console.log('Missing Detaills');
    }
    const res = await register({name, email, password});
    console.log(res);
  }

  const handleChange = (e) => {
      setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
      console.log(form);
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
