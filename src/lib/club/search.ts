export interface ClubPostSearchResponse {
  clubPosts: ClubPostSearch[];
}

export interface ClubPostSearch {
  club_id: number;
  club_name: string;
  club_img: string;
}

async function searchForClubFn({
  club_name,
}: {
  club_name: string;
}): Promise<ClubPostSearchResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/searchForClub?club_name=${encodeURIComponent(
    club_name
  )}`;

  const res = await fetch(url, {
    method: "GET",
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
export default searchForClubFn;
