async function updateLikesFn({ video_id }: { video_id: string }) {
  const url = `https://e-awards.ooshinfo.com/api/v1/shortVideos/updateLikesCount?video_id=${video_id}`;

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
export default updateLikesFn;
