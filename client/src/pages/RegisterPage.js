import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../css/login.css"
import {motion as m} from "framer-motion"

export default function RegisterPage(){
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    number:'',
    password: '',
    userPhoto: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const url = "http://localhost:4000"
 

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Check if the input is a file input
    if (name === 'userPhoto' && files.length > 0) {
        setFormData({ ...formData, userPhoto: files[0] });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const registerUser =  async(e) => {
    e.preventDefault();
    try{
        if(formData.password !== confirmPassword){
          alert("Passwords do not match")
          return
        }
        const {firstName, middleName, lastName, email,number ,password, userPhoto} = formData;
        const response = await axios.post(`${url}/register`,{
            firstName:firstName,
            middleName:middleName,
            lastName:lastName,
            email:email,
            number:number,
            password:password,
            userPhoto:userPhoto
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
        if(response.status === 200){
            alert("User Registered Successfully")
            setFormData({
              firstName: '',
              middleName: '',
              lastName: '',
              email: '',
            number:'',
              password: '',
              userPhoto: '',
            })
            setConfirmPassword('')
            setRedirect(true)

        }else{
            alert("Error registering the user")
        }

    }catch(error){
      console.log("Error on registration :",error)
    }
    
  };
  if(redirect){
    return <Navigate to={`/login`} />;
  }


  const backgroundImageUrl = "https://images.pexels.com/photos/9956771/pexels-photo-9956771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"


  return (
    <m.div
    initial={{opacity:0}} 
    animate={{opacity:1}}
    exit={{opacity:0}} 
    transition={{duration:1,ease:"easeOut"}}
    >
    <div className="flex justify-center items-center h-screen bg-gray-100"
    style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="register-container relative">
        <h1 className="register-text font-bold mb-6 text-white">Register Here | Join CoverCraft</h1>
        <form onSubmit={registerUser}>
          <div className='div1 flex items-center justify-between'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">First Name <span className='text-red-600'>*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md)"
              autoComplete='off'
              autoFocus
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Last Name <span className='text-red-600'>*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md ml-1rem"
              required
              autoComplete='off'
            />
          </div>
          </div>

          <div className='div1 flex items-center justify-between'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Email <span className='text-red-600'>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
              autoComplete='off'
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Number <span className='text-red-600'>*</span></label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
              autoComplete='off'
            />
          </div>
          </div>

          <div className='div1 flex items-center justify-between'>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Password <span className='text-red-600'>*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
              autoComplete='off'
              minLength="8"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Confirm Password <span className='text-red-600'>*</span></label>
            <input
              type="password"
              name="password"
              value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
              autoComplete='off'
              minLength="8"
            />
          </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Photo <span className='text-red-600'>*</span></label>
            {formData.userPhoto && (
              <img
                src={URL.createObjectURL(formData.userPhoto)}
                alt="user"
                className="w-20 h-20 object-cover rounded-full"
              />
            )}
            <input
              type="file"
              name="userPhoto"
              value={formData.photo}
              autoComplete='off'
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-white ml-2"
            />
          </div>

          <button
            type="submit"
            className="reg-button"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-white">
          Already have an account? <Link to="/login" className="text-red-500">Login here</Link>
        </p>
      </div>
    </div>
    </m.div>
  );
};


