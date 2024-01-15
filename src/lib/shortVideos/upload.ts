import returnJWT from "../../components/global/returnJWT";

async function uploadShortVideoFn(formData: FormData) {
  const url = `http://localhost:3000/api/v1/shortVideos`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${returnJWT()}`,
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
  console.log({ data });

  return data;
}
export default uploadShortVideoFn;
