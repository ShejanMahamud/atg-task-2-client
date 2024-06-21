import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
    AiFillLike,
    AiOutlineComment,
    AiOutlineDelete,
    AiOutlineEdit,
} from "react-icons/ai";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Post = ({ post, postRefetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showComments, setShowComments] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [editContent, setEditContent] = useState(post.content);

  const handleDeletePost = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteAsync(id);
          Swal.fire({
            title: "Deleted!",
            text: "Post has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const { mutateAsync: deleteAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/post/${id}`);
      return data;
    },
    onSuccess: (data) => {
      postRefetch();
      toast.success(data.message);
    },
  });

  const { mutateAsync: likeAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/like/${id}`);
      return data;
    },
    onSuccess: () => {
      postRefetch();
    },
  });

  const handleLikePost = async (id) => {
    try {
      await likeAsync(id);
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  const { mutateAsync: updateAsync } = useMutation({
    mutationFn: async ({ id, newContent }) => {
      const { data } = await axiosSecure.patch(`/post/${id}`, { newContent });
      return data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        setEditPostId(null);
        postRefetch();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleUpdatePost = async (id, newContent) => {
    try {
      await updateAsync({ id, newContent });
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  const { mutateAsync: commentAsync } = useMutation({
    mutationFn: async ({ commentInfo, id }) => {
      const { data } = await axiosSecure.patch(`/comment/${id}`, {
        commentInfo,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        postRefetch();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleAddComment = async (e, id) => {
    e.preventDefault();
    try {
      const comment = e.target.comment.value;
      const commentInfo = {
        comment,
        user_name: user?.name,
        user_photo: user?.photo,
      };
      await commentAsync({ commentInfo, id });
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="mb-6 p-6 bg-white shadow-md rounded-lg w-full">
      <div className="flex items-center mb-4">
        <img
          src={post.user_photo}
          alt="user.png"
          className="w-12 h-12 object-cover rounded-full"
        />
        <h3 className="ml-4 text-lg font-semibold">{post.user_name}</h3>
      </div>
      {editPostId === post._id ? (
        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows="4"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => handleUpdatePost(post._id, editContent)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Update Post
            </button>
            <button
              onClick={() => setEditPostId(null)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-4">{post.content}</p>
          {post.photo && (
            <img
              src={post.photo}
              alt="Post"
              className="mt-4 rounded-lg max-h-80 object-cover w-full"
            />
          )}
        </>
      )}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => handleLikePost(post._id)}
          className={`flex items-center ${
            post.likedBy.includes(user._id) ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <AiFillLike size={20} />
          <span className="ml-1">
            {post.likes} {post.likedBy.includes(user._id) && "Liked"}
          </span>
        </button>
        <button
          onClick={() => setShowComments(post._id)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <AiOutlineComment size={20} />
          <span className="ml-1">{post?.comments?.length}</span>
        </button>
        <button
        disabled={post.user_email !== user.email}
          onClick={() => handleDeletePost(post._id)}
          className="flex items-center text-red-600 hover:text-red-800 transition"
        >
          <AiOutlineDelete size={20} />
        </button>
        <button
          onClick={() => setEditPostId(post._id)}
          disabled={post.user_email !== user.email}
          className="flex items-center text-green-600 hover:text-green-800 transition"
        >
          <AiOutlineEdit size={20} />
        </button>
      </div>
      {showComments === post?._id && (
        <div className="mt-4">
          <form onSubmit={(e) => handleAddComment(e, post?._id)}>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none"
              name="comment"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-2 mt-5"
            >
              Comment
            </button>
            <button
              onClick={() => setShowComments(null)}
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded transition mt-5"
            >
              Cancel
            </button>
          </form>
          {post.comments &&
            post.comments.map((comment) => (
              <div key={comment._id} className="mt-2 p-2 bg-gray-100 rounded">
                <div className="flex items-center gap-2">
                  <img
                    src={comment?.user_photo}
                    alt="user.png"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex items-start gap-1 flex-col">
                    <p className="font-semibold">{comment?.user_name}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Post;
