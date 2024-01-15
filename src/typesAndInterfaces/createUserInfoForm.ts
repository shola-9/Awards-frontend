export interface CreateUserInfoForm {
  user_phone_number: string;
  user_img: FileList | string;
  [key: string]: string | number | FileList;
}
