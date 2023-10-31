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
  CLEAR_CURRENT_AUTHOR,
  CLEAR_AUTHORS,
} from "../types";
import api from "../../utils/api";

const AuthorState = (props) => {
  const initialState = {
    authors: null,
    currentAuthor: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthorReducer, initialState);

  // Get authors
  const getAuthors = async () => {
    try {
      const res = await api.get("/author");

      dispatch({ type: GET_AUTHORS, payload: res.data });
    } catch (err) {
      // console.error(err)
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
    }
  };

  // add author
  const addAuthor = async (author) => {
    // if we are sending data then we need this header
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.post("/author", author, config);

      dispatch({ type: ADD_AUTHOR, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
    }
  };

  // update author
  const updateAuthor = async (author) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.put(`/author/${author._id}`, author, config);

      dispatch({ type: UPDATE_AUTHOR, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
    }
  };

  // delete author
  const deleteAuthor = async (id) => {
    try {
      await api.delete(`api/author/${id}`);

      dispatch({ type: DELETE_AUTHOR, payload: id });
    } catch (err) {
      dispatch({ type: AUTHOR_ERROR, payload: "API Error" });
    }
  };

  // // Clear Authors
  // const clearAuthors = () => {
  //   dispatch({ type: CLEAR_AUTHORS });
  // };

  // // set current contact
  // const setCurrentAuthor = (contact) => {
  //   dispatch({ type: SET_CURRENT_AUTHOR, payload: contact });
  // };

  // // clear current contact
  // const clearCurrent = () => {
  //   dispatch({ type: CLEAR_CURRENT });
  // };

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
        // setCurrent,
        // clearCurrent,
        // filterContacts,
        // clearFilter,
        // clearContacts,
      }}
    >
      {props.children}
    </AuthorContext.Provider>
  );
};

export default AuthorState;
