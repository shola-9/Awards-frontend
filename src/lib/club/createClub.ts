export default async function createClubFn(formData: FormData) {
  const url = "https://e-awards.ooshinfo.com/api/v1/club";

  const response = await fetch(url, {
    method: "POST",
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
