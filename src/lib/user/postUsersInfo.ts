import Cookies from "js-cookie";

async function postUserinfoFn(formData: FormData) {
  const token = Cookies.get("token");

  const url = "https://e-awards.ooshinfo.com/api/v1/users/completeUserInfo";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

  return data;
}
export default postUserinfoFn;
