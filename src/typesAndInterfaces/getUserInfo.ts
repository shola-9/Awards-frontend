export interface GetUserInfoResponse {
  user: User;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  users_phone_number: null | string;
  user_img: null | string;
}
