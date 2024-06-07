import Cookies from "js-cookie";

async function addVoteFn({
  award_id,
  candidate,
}: {
  award_id: string;
  candidate: string;
}) {
  const url = `https://e-awards.ooshinfo.com/api/v1/vote/addVote?award_id=${award_id}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ candidate }),
  });

  // 404 and the likes gotten here
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
export default addVoteFn;
