async function updateClubPostViewsFn({
  club_post_id,
}: {
  club_post_id: number;
}) {
  const url = `http://localhost:3000/api/v1/club/increaseClubPostViews?club_post_id=${club_post_id}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
  console.log({ data });

  return data;
}
export default updateClubPostViewsFn;
