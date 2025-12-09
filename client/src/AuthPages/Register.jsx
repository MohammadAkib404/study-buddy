import React from 'react'
import { useState } from 'react'
import { register } from '../Api/auth'

export const Register = () => {

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
    <section className='h-screen pt-30 bg-gray-200 flex justify-center'>
      <form className='bg-gray-50 w-6/10 h-max flex flex-col gap-8 p-12 rounded-xl'>

        <h1 className='text-3xl font-bold mb-12'>Create Account</h1>

        <input type="text" name='name' placeholder='Enter Your Name' value={form.name} onChange={handleChange} required className='border border-border px-5 py-3 rounded-lg' />

        <input type="email" name='email' placeholder='Email address' value={form.email} onChange={handleChange} required className='border border-border px-5 py-3 rounded-lg' />
        <input type="password" name='password' placeholder='Password' value={form.password} onChange={handleChange} required className='border border-border px-5 py-3 rounded-lg'/>

        <button onClick={handleSubmit} className='bg-brand text-xl text-base font-semibold p-3 rounded-lg mt-10'>Sign Up</button>

        <p>
          <span className='text-muted'>Already have an account? </span> 
          <a className='text-brand underline'>Log In</a>
          </p>

      </form>
    </section>
  )
}
