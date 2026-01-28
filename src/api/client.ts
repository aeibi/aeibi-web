import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { userServiceRefreshToken } from "./generated";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const token = {
  get: () => localStorage.getItem("access_token"),
  set: (t: string) => localStorage.setItem("access_token", t),
  getRefresh: () => localStorage.getItem("refresh_token"),
  setRefresh: (t: string) => localStorage.setItem("refresh_token", t),
  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

export const api = axios.create({ baseURL });

api.interceptors.request.use((req) => {
  const t = token.get();
  if (t) req.headers.Authorization = `Bearer ${t}`;
  return req;
});

createAuthRefreshInterceptor(
  api,
  async (failedRequest) => {
    try {
      const data = await userServiceRefreshToken({
        refreshToken: token.getRefresh() as string,
      });
      token.set(data.tokens.accessToken);
      failedRequest.response.config.headers.Authorization = `Bearer ${data.tokens.accessToken}`;
      return Promise.resolve();
    } catch (e) {
      token.clear();
      return Promise.reject(e);
    }
  },
  { pauseInstanceWhileRefreshing: true },
);
