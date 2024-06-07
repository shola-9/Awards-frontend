import Cookies from "js-cookie";
import {
  ClubPostResponse,
  ClubPost404Response,
} from "../../typesAndInterfaces/getClubPosts";

export default async function getClubPostsByUserIdFn(): Promise<
  ClubPostResponse | ClubPost404Response
> {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/getClubPostByUserId`;

  const token = Cookies.get("token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
