import {
  GET_TEAMS,
  GET_TEAMS_COUNT,
  // ADD_TEAM,
  DELETE_TEAM,
  UPDATE_TEAM,
  TEAM_ERROR,
  SET_CURRENT_TEAM,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        loading: false,
      };

    case GET_TEAMS_COUNT:
      return {
        ...state,
        totalTeams: action.payload,
        loading: false,
      };

    // case ADD_TEAM:
    //   return {
    //     ...state,
    //     teams: [action.payload, ...state.teams],
    //     loading: false,
    //   };

    case UPDATE_TEAM:
      return {
        ...state,
        teams: state.teams.map((team) =>
          team._id === action.payload._id ? action.payload : team
        ),
        loading: false,
      };

    case DELETE_TEAM:
      return {
        ...state,
        teams: state.teams.filter((team) => team._id !== action.payload),
        loading: false,
      };

    case SET_CURRENT_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
      };

    case TEAM_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
