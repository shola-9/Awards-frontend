import {
  ClubPostResponse,
  ClubPost404Response,
} from "../../typesAndInterfaces/getClubPosts";

export default async function getClubPostsFn({
  club_id,
}: {
  club_id: string;
}): Promise<ClubPostResponse | ClubPost404Response> {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/getClubPost?club_id=${club_id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      `Request failed with status ${response.status}, ${JSON.stringify(
        errorResponse
      )}`
    );
  }

  const data: ClubPostResponse | ClubPost404Response = await response.json();

  return data;
}
