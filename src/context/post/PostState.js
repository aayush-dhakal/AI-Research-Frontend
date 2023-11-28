import React, { useReducer } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_ERROR,
  SET_CURRENT_POST,
} from "../types";
import api from "../../utils/api";
import { toast } from "react-toastify";

const PostState = (props) => {
  const initialState = {
    posts: [],
    currentPost: null,
    error: null,
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  // Get posts
  const getPosts = async (sort, page, pageSize) => {
    const sortBy = sort?.sortBy ?? "createdAt";
    const sortOrder = sort?.sortOrder ?? "desc";

    try {
      const res = await api.get(
        `/post?sort=${sortBy},${sortOrder}&page=${page}&limit=${pageSize}`
      );

      dispatch({ type: GET_POSTS, payload: res.data?.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: POST_ERROR, payload: "API Error" });
    }
  };

  // add post
  const addPost = async (post) => {
    try {
      const res = await api.post("/post", post, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: ADD_POST, payload: res.data?.data });
      toast.success("Post added");
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: "API Error" });
      toast.error("Error adding the post", err);
    }
  };

  // update post
  const updatePost = async (post) => {
    try {
      const res = await api.put(`/post/${post.id}`, post, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: UPDATE_POST, payload: res.data?.data });
      toast.success("Post updated");
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: "API Error" });
      toast.error("Error updating the post", err);
    }
  };

  // delete post
  const deletePost = async (id) => {
    try {
      await api.delete(`/post/${id}`, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: DELETE_POST, payload: id });
      toast.success("Post deleted");
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: "API Error" });
      toast.error("Error deleting the post", err);
    }
  };

  // set current post
  const setCurrentPost = (post) => {
    dispatch({ type: SET_CURRENT_POST, payload: post });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        currentPost: state.currentPost,
        error: state.error,
        getPosts,
        addPost,
        updatePost,
        deletePost,
        setCurrentPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
