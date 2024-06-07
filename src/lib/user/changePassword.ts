import Cookies from "js-cookie";

export const changePasswordFn = async ({
  oldPassword,
  newPassword,
  setErrMsg,
}: {
  oldPassword: string;
  newPassword: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const url = "https://e-awards.ooshinfo.com/api/v1/users/changePassword";

  const token = Cookies.get("token");

  // attempt fetch
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });

  // check for if res fails
  if (!res.ok) {
    const exactErrorMsg = await res.json();

    // Set the error message in the state
    if (res.status === 400) {
      setErrMsg("All fields are required");
    } else if (res.status === 401) {
      setErrMsg("Unauthorized. Please login/Signup");
    } else if (res.status === 403) {
      setErrMsg(exactErrorMsg.message);
    } else if (res.status === 404) {
      setErrMsg("User not found");
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
  const data = await res.json();

  return data;
};
