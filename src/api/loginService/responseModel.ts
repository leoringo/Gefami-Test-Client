export interface ILoginResponse {
  token: string;
  username: string;
}

export interface IRegisterResponse {
  id: number;
  username: string;
  password: string;
  address: string;
  updatedAt: string;
  createdAt: string;
}
