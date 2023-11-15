import React, { useReducer } from "react";
import TeamContext from "./TeamContext";
import TeamReducer from "./TeamReducer";
import {
  GET_TEAMS,
  // ADD_TEAM,
  DELETE_TEAM,
  UPDATE_TEAM,
  TEAM_ERROR,
  SET_CURRENT_TEAM,
} from "../types";
import api from "../../utils/api";
import { toast } from "react-toastify";

const TeamState = (props) => {
  const initialState = {
    teams: [],
    currentTeam: null,
    error: null,
  };

  const [state, dispatch] = useReducer(TeamReducer, initialState);

  // Get teams
  const getTeams = async () => {
    try {
      const res = await api.get("/auth/users");

      dispatch({ type: GET_TEAMS, payload: res.data?.data });
    } catch (err) {
      // console.error(err)
      dispatch({ type: TEAM_ERROR, payload: "API Error" });
    }
  };

  // add team
  // const addTeam = async (team) => {
  //   try {
  //     const res = await api.post("/team", team, {
  //       withCredentials: true, // this is absolutely essential to set the cookie in browser
  //     });

  //     dispatch({ type: ADD_TEAM, payload: res.data?.data });
  //     toast.success("Team added");
  //   } catch (err) {
  //     dispatch({ type: TEAM_ERROR, payload: "API Error" });
  //     toast.error("Error adding the team", err);
  //   }
  // };

  // update team
  const updateTeam = async (team) => {
    try {
      const res = await api.put(`/auth/user/${team.id}`, team, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: UPDATE_TEAM, payload: res.data?.data });
      toast.success("Team updated");
    } catch (err) {
      console.log("errr....", err);
      dispatch({ type: TEAM_ERROR, payload: "API Error" });
      toast.error("Error updating the team", err);
    }
  };

  // delete team
  const deleteTeam = async (id) => {
    try {
      await api.delete(`/auth/user/${id}`, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });

      dispatch({ type: DELETE_TEAM, payload: id });
      toast.success("Team deleted");
    } catch (err) {
      dispatch({ type: TEAM_ERROR, payload: "API Error" });
      toast.error("Error deleting the team", err);
    }
  };

  // set current team for edit
  const setCurrentTeam = (team) => {
    dispatch({ type: SET_CURRENT_TEAM, payload: team });
  };

  return (
    <TeamContext.Provider
      value={{
        teams: state.teams,
        currentTeam: state.currentTeam,
        error: state.error,
        getTeams,
        // addTeam,
        updateTeam,
        deleteTeam,
        setCurrentTeam,
      }}
    >
      {props.children}
    </TeamContext.Provider>
  );
};

export default TeamState;
