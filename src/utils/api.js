import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_SERVER_API,
});

export default instance;
