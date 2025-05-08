import { http } from "../baseUrl";

export const axiosGetHistories = () =>
  http.get("/histories");
