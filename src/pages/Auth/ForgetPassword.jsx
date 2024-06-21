import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ForgetPassword = () => {
    const [show, setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
const navigate= useNavigate()
const {forgetPassword} = useAuth()

const handlePassword = async (e) => {
    e.preventDefault();
    try{
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm_password = form.confirm.value;
        if (password !== confirm_password) {
            return toast.error('Password not matched!');
          }
          const res = await forgetPassword(email,password)
          if(res.success){
            toast.success(res.message)
            form.reset()
            setTimeout(() => {
                navigate('/login')
            }, 1000);
          }else{
            toast.error(res.message)
          }
    }
    catch(error){
        toast.error('Something Went Wrong!')
    }
}

  return (
    <div className="h-auto w-full min-h-screen bg-login bg-no-repeat bg-center bg-cover grid grid-cols-1 row-auto items-center justify-center gap-10 lg:py-16 py-5 lg:px-80 px-5">
    <div className="bg-white rounded-3xl p-12 flex flex-col items-start gap-5 text-[#444444] shadow-xl">
      <h1 className="lg:text-3xl text-2xl font-bold">Forget Password? </h1>
      <p className='lg:text-base text-sm'>
        If you already have an account, you can{" "}
        <span
          onClick={() => navigate("/login")}
          className="font-medium cursor-pointer text-primary hover:underline"
        >
          Login here!
        </span>
      </p>
      <form onSubmit={handlePassword} className="mt-6 w-full grid lg:grid-cols-2 grid-cols-1 row-auto items-center gap-x-10 gap-y-5">

        <div className="lg:col-span-2 col-span-1">
          <label className="block text-sm text-gray-800">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            name="email"
            className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="">
            <label className="block mb-2 text-sm text-gray-600">Password</label>
            <div className="flex items-center justify-between w-full px-5 py-3 mt-2 border rounded-lg focus-within:border-primary focus-within:ring-primary focus-within:ring-opacity-40">
              <input
                name="password"
                required
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                className="block w-full text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              {show ? (
                <IoIosEyeOff
                  onClick={() => setShow(!show)}
                  className="text-gray-500 cursor-pointer"
                />
              ) : (
                <IoMdEye
                  onClick={() => setShow(!show)}
                  className="text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-600  ">
              Confirm Password
            </label>
            <div className="flex items-center justify-between w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-lg focus-within:border-primary focus-within:ring-primary focus-within:ring-opacity-40">
              <input
                name="confirm"
                required
                type={confirmShow ? "text" : "password"}
                placeholder="Confirm Password"
                className="block w-full  text-gray-700 placeholder-gray-400 focus:outline-none "
              />
              {confirmShow ? (
                <IoIosEyeOff
                  onClick={() => setConfirmShow(!confirmShow)}
                  className="text-gray-500 cursor-pointer"
                />
              ) : (
                <IoMdEye
                  onClick={() => setConfirmShow(!confirmShow)}
                  className="text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>

        <div className="mt-6 w-full flex items-center justify-end lg:col-span-2 col-span-1">
          <button
            style={{ boxShadow: "0px 4px 19px rgb(198 77 83 / 30%)" }}
            type="submit"
            className="px-10 py-4 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 lg:w-auto w-full"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default ForgetPassword