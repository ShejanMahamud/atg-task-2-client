import { UploadOutlined } from '@ant-design/icons';
import { Upload } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePhotoUpload from "../../hooks/usePhotoUpload";

const Register = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const {photo,uploadProps} = usePhotoUpload()
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const name = form.name.value;
      const username = form.username.value;
      const email = form.email.value;
      const password = form.password.value;
      const confirm_password = form.confirm.value;
      const gender = form.gender.value;
      const terms = form.terms.checked;

      if (password !== confirm_password) {
        return toast.error('Password not matched!');
      }
      if (!terms) {
        return toast.error('Select terms and policy!');
      }

      const user = { name, username, email, password, gender,photo };
      const res = await register(user);
      
      if(res.success){
        form.reset()
        toast.success('Successfully Registered!')
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      }
    } catch (error) {
      toast.error('Something Went Wrong')
      toast.error('Something Went Wrong!');
    }
  };

  return (
    <div className="h-auto w-full min-h-screen bg-login bg-no-repeat bg-center bg-cover grid grid-cols-1 row-auto items-center justify-center gap-10 lg:py-16 py-5 lg:px-80 px-5">
      <div className="bg-white rounded-3xl p-12 flex flex-col items-start gap-5 text-[#444444] shadow-xl">
        <h1 className="lg:text-3xl text-2xl font-bold">🚀 Register Now! </h1>
        <p className='lg:text-base text-sm'>
          If you already have an account, you can{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-medium cursor-pointer text-primary hover:underline"
          >
            Login here!
          </span>
        </p>
        <form onSubmit={handleRegistration} className="mt-6 w-full grid lg:grid-cols-2 grid-cols-1 row-auto items-center gap-x-10 gap-y-5">
          <div>
            <label className="block text-sm text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              required
              name="name"
              className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800">
              User Name
            </label>
            <input
              type="text"
              placeholder="User Name"
              required
              name="username"
              className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
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

          <div className="lg:col-span-2 md:col-span-1 col-span-1">
              <label class="block mb-2 text-sm text-gray-600  ">
               Upload Photo
              </label>
              <div className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
              <Upload {...uploadProps}>
    <button type="button" className="text-gray-400 text-base flex items-center gap-2">
      <UploadOutlined />
      <span>Click to Upload</span></button>
  </Upload>
                
              </div>
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
          <div className="lg:col-span-2 col-span-1">
              <label className="block mb-2 text-sm text-gray-600  ">
                Gender
              </label>
              <select
                required
                name="gender"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400   focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 col-span-2"
              >
                <option value="Select Type" disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex items-center gap-2 lg:col-span-2 col-span-1">
              <input
                name="terms"
                type="checkbox"
                className="focus:outline-[#9DC1EB] w-4 h-4 accent-primary rounded-lg"
              />
              <p className="text-[#767F8C] text-sm">
              By creating your account, you agree to our{" "}
                <span className="text-primary font-medium hover:underline underline-offset-2">
                Terms of Use
                {" & "}
                Privacy Policy
                </span>
              </p>
            </div>

          <div className="mt-6 w-full flex items-center justify-end lg:col-span-2 col-span-1">
            <button
              style={{ boxShadow: "0px 4px 19px rgb(198 77 83 / 30%)" }}
              type="submit"
              className="px-16 py-4 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 lg:w-auto w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
