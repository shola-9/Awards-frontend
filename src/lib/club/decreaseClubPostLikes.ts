async function decreaseClubPostLikesFn({
  club_post_id,
}: {
  club_post_id: number;
}) {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/decreaseClubPostLikes?club_post_id=${club_post_id}`;

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

  return data;
}
export default decreaseClubPostLikesFn;
