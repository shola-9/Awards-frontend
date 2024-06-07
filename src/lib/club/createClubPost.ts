import Cookies from "js-cookie";

export default async function createClubPostFn(
  formData: FormData,
  club_id: string
) {
  const url = `https://e-awards.ooshinfo.com/api/v1/club/createClubPost?club_id=${club_id}`;

  const token = Cookies.get("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
