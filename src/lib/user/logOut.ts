import Cookies from "js-cookie";

async function logOutFn() {
  const token = Cookies.get("token");

  const url = "https://e-awards.ooshinfo.com/api/v1/users/logout";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // check for if res fails
  if (!res.ok) {
    const exactErrorMsg = await res.json();

    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg.message}`
    );
  }

  // get good res at this stage
  const data = await res.json();

  Cookies.remove("token", {
    path: "/",
    secure: true,
    sameSite: "strict",
    expires: 0,
  });

  return data;
}
export default logOutFn;
