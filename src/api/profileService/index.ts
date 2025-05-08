import { http } from "../baseUrl";
import type { IEditProfileRequest } from "./requestModel";

export const axiosEditProfile = (payload: IEditProfileRequest) =>
  http.post("/user/edit", payload);
