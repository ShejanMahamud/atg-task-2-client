import React, { useState } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import { IoMenuOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
const [open,setOpen] = useState(false)
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
      <div className='flex items-center gap-2 text-white'>
        <IoIosChatboxes className='lg:text-3xl text-2xl'/>
        <h2 className="lg:text-2xl text-base font-medium ">Banao Social</h2>
        </div>
        <div className={`flex flex-col items-center absolute top-16 right-5 bg-white rounded-lg lg:hidden p-10 gap-y-3 ${open ? 'flex' : 'hidden'}`}>
        <NavLink
            className={({ isActive }) =>
              isActive
                ? " text-primary font-medium"
                : " text-gray-600 font-normal text-base cursor-pointer"
            }
            to={"/"}
          >
            
              Home
            
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " text-primary font-medium"
                : " text-gray-600 font-normal text-base cursor-pointer"
            }
            to={"/profile"}
          >
            
            Profile
            
          </NavLink>
        <NavLink
            className={({ isActive }) =>
            isActive
              ? " text-primary font-medium"
              : " text-gray-600 font-normal text-base cursor-pointer"
          }
            to={"/messages"}
          >
            
              Messages
            
          </NavLink>
        <NavLink
            className={({ isActive }) =>
            isActive
              ? " text-primary font-medium"
              : " text-gray-600 font-normal text-base cursor-pointer"
          }
            to={"/notiflication"}
          >
            
              Notification
            
          </NavLink>
        </div>
        <div className="lg:flex space-x-10 hidden">
        <NavLink
            className={({ isActive }) =>
              isActive
                ? " decoration-2 underline-offset-8 text-primary font-medium"
                : "no-underline text-gray-100 font-normal lg:text-base md:text-sm text-xs cursor-pointer"
            }
            to={"/"}
          >
            
              Home
            
          </NavLink>
        <NavLink
            className={({ isActive }) =>
              isActive
                ? " decoration-2 underline-offset-8 text-primary font-medium"
                : "no-underline text-gray-100 font-normal lg:text-base md:text-sm text-xs cursor-pointer"
            }
            to={"/profile"}
          >
            
              Profile
            
          </NavLink>
        <NavLink
            className={({ isActive }) =>
              isActive
                ? " decoration-2 underline-offset-8 text-primary font-medium"
                : "no-underline text-gray-100 font-normal lg:text-base md:text-sm text-xs cursor-pointer"
            }
            to={"/messages"}
          >
            
              Messages
            
          </NavLink>
        <NavLink
            className={({ isActive }) =>
              isActive
                ? " decoration-2 underline-offset-8 text-primary font-medium"
                : "no-underline text-gray-100 font-normal lg:text-base md:text-sm text-xs cursor-pointer"
            }
            to={"/notiflication"}
          >
            
              Notiflication
            
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
        <IoMenuOutline onClick={()=>setOpen(!open)} className='text-3xl text-white lg:hidden inline-block cursor-pointer'/>
          {user ? (
            <>
              <img src={user?.photo} alt="user.png" className='w-10 h-10 object-cover rounded-full ring ring-primary'/>
              <button
                onClick={handleLogout}
                className="bg-primary text-white font-medium py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
