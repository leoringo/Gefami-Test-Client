import { http } from "../baseUrl";
import type { IAddJsonRequest, IDeleteJsonRequest } from "./requestModel";

export const axiosGetJsonList = () => http.get("/jsondata");

export const axiosDeleteJson = (payload: IDeleteJsonRequest) =>
  http.post("/jsondata/delete", payload);

export const axiosCreateJson = (payload: IAddJsonRequest) =>
  http.post("/jsondata/create", payload);
