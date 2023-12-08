import Cookies from "js-cookie";

export default async function createMemberFn({ club_id }: { club_id: string }) {
  const url = `http://localhost:3000/api/v1/club/createClubMember?club_id=${club_id}`;

  const token = Cookies.get("token");

  const response = await fetch(url, {
    method: "POST",
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
