import { API } from "./interfaces";
import { ServerAPI } from "./server";

const API_URL = process.env.REACT_APP_API_URL || window.location.origin;

const api: API = new ServerAPI(API_URL);

export const useAPI = () => api;