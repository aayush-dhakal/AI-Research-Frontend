import {
  GET_AUTHORS,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
  AUTHOR_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_AUTHORS:
      return {
        ...state,
        authors: action.payload,
        loading: false,
      };

    case ADD_AUTHOR:
      return {
        ...state,
        authors: [action.payload, ...state.authors],
        loading: false,
      };

    case UPDATE_AUTHOR:
      return {
        ...state,
        authors: state.authors.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };

    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter(
          (contact) => contact._id !== action.payload
        ),
        loading: false,
      };

    case AUTHOR_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
