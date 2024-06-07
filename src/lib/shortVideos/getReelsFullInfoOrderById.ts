import { Response } from "../../typesAndInterfaces/shortVideos";

async function getReelsFullInfoOrderByIdFn({
  video_id,
}: {
  video_id: string;
}): Promise<Response> {
  // returns the most current posts
  const url = `https://e-awards.ooshinfo.com/api/v1/shortVideos/getFullInfo?video_id=${video_id}`;

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
  const data: Response = await res.json();

  return data;
}
export default getReelsFullInfoOrderByIdFn;
