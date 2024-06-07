import Cookies from "js-cookie";
export default async function deleteClubMemberFn({
  club_id,
}: {
  club_id: string;
}) {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/deleteClubMember?club_id=${club_id}`;

  const token = Cookies.get("token");

  const response = await fetch(url, {
    method: "DELETE",
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

  const data = await response.json();

  return data;
}
