import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiCog, BiHome, BiLogOut, BiUser } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import Post from '../Utils/Post';
import CreatePost from '../components/CreatePost';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const axiosCommon = useAxios();
  const {logout} = useAuth()

  const { data: posts, isPending, refetch: postRefetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/posts`);
      return data?.posts;
    },
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white shadow-md p-6 h-full z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <IoIosChatboxes className="text-3xl text-primary" />
            <h2 className="text-2xl font-medium text-primary">Banao Social</h2>
          </div>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center">
            <BiHome className="text-gray-700 mr-2" size={24} />
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </a>
          </li>
          <li className="flex items-center">
            <BiUser className="text-gray-700 mr-2" size={24} />
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Profile
            </a>
          </li>
          <li className="flex items-center">
            <BiCog className="text-gray-700 mr-2" size={24} />
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Settings
            </a>
          </li>
          <li className="flex items-center">
            <BiLogOut className="text-red-500 mr-2" size={24} />
            <button onClick={()=>logout()} className="text-red-500 hover:text-red-700 transition">
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Hamburger Menu */}
      <div className="lg:hidden fixed top- z-50 bg-primary text-white p-1 ">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={16} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto lg:ml-64">
        {/* Create Post */}
        <CreatePost postRefetch={postRefetch} />

        {posts && posts.map((post) => (
          <Post key={post?._id} post={post} postRefetch={postRefetch} />
        ))}
      </main>
    </div>
  );
};

export default Home;
