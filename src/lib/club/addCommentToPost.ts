export default async function addCommentToPostFn({
  club_post_id,
  club_post_comment,
}: {
  club_post_id: number;
  club_post_comment: string;
}) {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/postCommentToPost?club_post_id=${club_post_id}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ club_post_comment }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      `Request failed with status ${response.status}, ${JSON.stringify(
        errorResponse
      )}`
    );
  }

  const data = await response.json();

  return data;
}
