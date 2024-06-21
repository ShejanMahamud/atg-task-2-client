import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const username = form.username.value;
      const password = form.password.value;
      const res = await login(username, password);
      if(res.success){
        toast.success(res.message)
        form.reset();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }else{
        toast.error(res.message)
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="h-auto w-full min-h-screen bg-login bg-no-repeat bg-center bg-cover grid grid-cols-1 row-auto items-center justify-center gap-10 lg:py-16 py-5 lg:px-80 px-5">
      <div className="bg-white rounded-3xl p-12 flex flex-col items-start gap-5 text-[#444444] shadow-xl">
        <h1 className="lg:text-3xl text-2xl font-bold">Welcome Back! 👋</h1>
        <p className="lg:text-base text-sm">
          If you don’t have an account, you can{" "}
          <span
            onClick={() => navigate("/register")}
            className="font-medium cursor-pointer text-primary hover:underline"
          >
            Register here!
          </span>
        </p>
        <form onSubmit={handleLogin} className="mt-6 w-full">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-800">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Your Username"
              required
              name="username"
              className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
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
          <div className="w-full flex items-center justify-end lg:mt-6 mt-3">
            <span onClick={()=>navigate('/forget_password')} className="text-primary text-sm font-medium">
              Forget Password?
            </span>
          </div>

          <div className="mt-6 w-full flex items-center justify-end">
            <button
              style={{ boxShadow: "0px 4px 19px rgb(198 77 83 / 30%)" }}
              type="submit"
              className="px-16 py-4 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 lg:w-auto w-full"
            >
              Sign In
            </button>
          </div>
        </form>
        <Avatar.Group
          shape="circle"
          className="w-full flex items-center justify-center mt-8"
        >
          <Avatar size={40} style={{ backgroundColor: "#fde3cf" }}>
            A
          </Avatar>
          <Avatar size={40} style={{ backgroundColor: "#f56a00" }}>
            K
          </Avatar>
          <Avatar size={40} style={{ backgroundColor: "#f56a00" }}>
            J
          </Avatar>
          <Avatar size={40} style={{ backgroundColor: "#f56a00" }}>
            H
          </Avatar>
          <Avatar
            size={40}
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <Avatar
            size={40}
            style={{ backgroundColor: "#1677ff" }}
            icon={<AntDesignOutlined />}
          />
          <Avatar size={40} style={{ backgroundColor: "#1677ff" }}>
            100+
          </Avatar>
        </Avatar.Group>
      </div>
    </div>
  );
};

export default Login;
