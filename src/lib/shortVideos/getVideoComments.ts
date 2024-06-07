import { VideoCommentsResponse } from "../../typesAndInterfaces/getVideoComments";

async function getVideoCommentsFn({
  video_id,
}: {
  video_id: string;
}): Promise<VideoCommentsResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/shortVideos/getShortVideosComments?video_id=${video_id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ video_id }),
  });

  // check for if res fails
  if (!res.ok) {
    const exactErrorMsg = await res.json();
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg.message}`
    );
  }

  // get good res at this stage
  const data: VideoCommentsResponse = await res.json();

  return data;
}
export default getVideoCommentsFn;
