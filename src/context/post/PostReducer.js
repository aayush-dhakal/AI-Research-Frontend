import {
  GET_POSTS,
  GET_POSTS_COUNT,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_ERROR,
  SET_CURRENT_POST,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case GET_POSTS_COUNT:
      return {
        ...state,
        totalPosts: action.payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };

    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };

    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
