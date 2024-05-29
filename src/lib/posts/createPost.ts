import { token } from "../user/getToken";
async function createPostFn(formData: FormData) {
  console.log(token);

  console.log(formData);

  const url = "http://127.0.0.1:4192/api/v1/posts";

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
export default createPostFn;
