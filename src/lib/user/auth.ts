import Cookies from "js-cookie";
import { Auth } from "../../typesAndInterfaces/auth";

export const authFn = async (
  {
    username,
    email,
    password,
    users_phone_number,
    token,
    setErrMsg,
  }: {
    username?: string;
    email: string;
    password: string;
    users_phone_number?: string;
    token?: string;
    setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  },
  identifier: string
): Promise<Auth> => {
  let url;

  // identifier is either login, signup or reset password
  if (identifier === "login") {
    url = "https://e-awards.ooshinfo.com/api/v1/users/login";
  } else if (identifier === "register") {
    url = "https://e-awards.ooshinfo.com/api/v1/users";
  } else if (identifier === "resetPassword") {
    url = "https://e-awards.ooshinfo.com/api/v1/auth/reset-password";
  } else {
    throw new Error("Invalid identifier");
  }

  // attempt fetch
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      username,
      email,
      password,
      users_phone_number,
      token,
    }),
  });

  // check for if res fails
  if (!res.ok) {
    const exactErrorMsg = await res.json();

    // Set the error message in the state
    if (res.status === 400) {
      setErrMsg("Email already registered. Please login.");
    } else if (res.status === 401) {
      setErrMsg("Invalid email or password.");
    } else if (res.status === 403) {
      setErrMsg("Access denied.");
    } else {
      console.log(
        `Request failed with status ${res.status}, ${JSON.stringify(
          exactErrorMsg
        )}`
      );

      setErrMsg("Internal server error. Please try again later.");
    }

    // Throw an error to stop further execution
    throw new Error("Request failed");
  }

  // get good res at this stage
  const data: Auth = await res.json();

  // remove cookie if it already exists
  Cookies.set("token", data.token, {
    expires: 60,
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  return data;
};
