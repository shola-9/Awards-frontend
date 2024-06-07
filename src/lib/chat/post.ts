import Cookies from "js-cookie";

async function postChatFn({
  receiver_id,
  content,
}: {
  receiver_id: string;
  content: string;
}) {
  const token = Cookies.get("token");

  const url = `https://e-awards.ooshinfo.com/api/v1/chat`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      receiver_id,
      content,
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
  const data = await res.json();

  return data;
}
export default postChatFn;
