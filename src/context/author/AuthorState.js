import React, { useReducer } from "react";
import AuthorContext from "./AuthorContext";
import AuthorReducer from "./AuthorReducer";
import {
  GET_AUTHORS,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
  AUTHOR_ERROR,
  SET_CURRENT_AUTHOR,
} from "../types";
import api from "../../utils/api";
import { toast } from "react-toastify";

const AuthorState = (props) => {
  const initialState = {
    authors: [],
    currentAuthor: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthorReducer, initialState);

  // Get authors
  const getAuthors = async () => {
    try {
      const res = await api.get("/author");

      dispatch({ type: GET_AUTHORS, payload: res.data?.data });
    } catch (err) {
      // console.error(err)
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
    }
  };

  // add author
  const addAuthor = async (author) => {
    try {
      const res = await api.post("/author", author, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: ADD_AUTHOR, payload: res.data?.data });
      toast.success("Author added");
    } catch (err) {
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
      toast.error("Error adding the author", err);
    }
  };

  // update author
  const updateAuthor = async (author) => {
    try {
      const res = await api.put(`/author/${author.id}`, author, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: UPDATE_AUTHOR, payload: res.data?.data });
      toast.success("Author updated");
    } catch (err) {
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
      toast.error("Error updating the author", err);
    }
  };

  // delete author
  const deleteAuthor = async (id) => {
    try {
      await api.delete(`/author/${id}`, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: DELETE_AUTHOR, payload: id });
      toast.success("Author deleted");
    } catch (err) {
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
      toast.error("Error deleting the author", err);
    }
  };

  // set current author for edit
  const setCurrentAuthor = (author) => {
    dispatch({ type: SET_CURRENT_AUTHOR, payload: author });
  };

  return (
    <AuthorContext.Provider
      value={{
        authors: state.authors,
        currentAuthor: state.currentAuthor,
        error: state.error,
        getAuthors,
        addAuthor,
        updateAuthor,
        deleteAuthor,
        setCurrentAuthor,
      }}
    >
      {props.children}
    </AuthorContext.Provider>
  );
};

export default AuthorState;
