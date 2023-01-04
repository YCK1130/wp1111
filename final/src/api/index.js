import axios from "axios";
import qs from "qs";

const errorHandling = (error) => {
  if (error.response.status === 403) window.location.replace("/");
};

export const SessionAPI = {
  getSession: () => axios.get(`/api/session`),
  postSession: (teamID, password) =>
    axios.post(
      `/api/session`,
      qs.stringify({
        teamID,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ),
  deleteSession: () => axios.delete(`/api/session`),
};

export const TeamDataAPI = {
  getTeamData: () =>
    axios
      .get(`/api/users`, {
        params: {
          teamName: 1,
          authority: 1,
          myCards: 1,
          requests: 1,
        },
      })
      .catch((error) => errorHandling(error)),
  postTeamData: (teams) =>
    axios.post(`/api/users`, teams).catch((error) => errorHandling(error)),
  deleteTeamData: (ids) =>
    axios
      .delete(`/api/users`, { data: [...ids] })
      .catch((error) => errorHandling(error)),
  putTeamData: (team) =>
    axios.put(`/api/users`, team).catch((error) => errorHandling(error)),
};

export const PasswordAPI = {
  putPassword: (passwords) =>
    axios
      .put(`/api/password`, passwords)
      .catch((error) => errorHandling(error)),
};
