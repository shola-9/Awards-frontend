export interface ClubMemberResponse {
  clubMembers: ClubMember[];
}

export interface ClubMember {
  group_members_id: number;
  user_id: number;
  club_id: number;
  username: string;
}

export default async function getClubMembersFn({
  club_id,
}: {
  club_id: string;
}): Promise<ClubMemberResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/getClubMembers?club_id=${club_id}`;

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

  const data = await response.json();

  return data;
}
