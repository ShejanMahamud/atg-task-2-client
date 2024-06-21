import { useMutation } from '@tanstack/react-query';
import { Upload } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillCameraFill } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import usePhotoUpload from '../hooks/usePhotoUpload';

const CreatePost = ({postRefetch}) => {
    const axiosSecure = useAxiosSecure()
    const { photo, uploadProps,setPhoto } = usePhotoUpload();
    const {user} = useAuth()
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
        setLoading(true)
        const content = e.target.content.value;
        const post = {content,photo,likes:0,comment:0,user_email:user?.email,user_photo:user?.photo,user_name:user?.name,likedBy: [],comments:[]}
        mutateAsync(post)
       }
       catch(error){
        toast.error('Something Went Wrong!')
       }
      };

      const {mutateAsync} = useMutation({
        mutationFn: async (post) => {
            const {data} = await axiosSecure.post(`${import.meta.env.VITE_SERVER_API}/posts`,post)
            return data
        },
        onSuccess: (data) => {
            postRefetch()
            setLoading(false)
            e.target.reset();
            setPhoto(null)
            toast.success(data?.message)
        }
      })

  return (
    <div className="mb-6 p-6 bg-white shadow-md rounded-lg">
    <h3 className="text-lg font-semibold mb-4">Create Post</h3>
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
        name='content'
        placeholder="What's on your mind?"
        rows="4"
      />
      <label className="flex items-center cursor-pointer mb-4">
        <BsFillCameraFill className="text-primary mr-2" size={24} />
        <Upload {...uploadProps} >
        </Upload>
          <span className={`text-primary transition font-medium ${photo ? 'hidden' : 'inline-block'}`}>Upload Photo</span>
      </label>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded transition"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  </div>
  )
}

export default CreatePost