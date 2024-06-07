import Cookies from "js-cookie";

export interface ClubMemberResponse {
  clubMember: ClubMember[];
}

export interface ClubMember {
  group_members_id: number;
  user_id: number;
  club_id: number;
}

export interface AlternativeClubMemberResponse {
  message: string;
}

export default async function getClubMember4JoinBtnFn({
  club_id,
}: {
  club_id: string;
}): Promise<ClubMemberResponse | AlternativeClubMemberResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/getClubMember4JoinBtn?club_id=${club_id}`;

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

  const data: ClubMemberResponse | AlternativeClubMemberResponse =
    await response.json();

  return data;
}
