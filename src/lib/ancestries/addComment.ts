import Cookies from "js-cookie";

async function postAncestriesCommentFn({
  post_id,
  comment,
}: {
  post_id: string;
  comment: string;
}) {
  const token = Cookies.get("token");

  const url = `https://e-awards.ooshinfo.com/api/v1/ancestries/addComment?post_id=${post_id}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      comment,
    }),
  });

  // check for if res fails
  if (!res.ok) {
    const exactErrorMsg = await res.json();
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg.message}`
    );
  }

  // get good res at this stage
  const data: Response = await res.json();

  return data;
}
export default postAncestriesCommentFn;
