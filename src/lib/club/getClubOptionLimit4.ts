import { ClubOptionResponse } from "../../typesAndInterfaces/club";

export default async function getGroupOptionLimit4Fn(): Promise<ClubOptionResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/getClubOptions`;

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

  const data: ClubOptionResponse = await response.json();

  return data;
}
