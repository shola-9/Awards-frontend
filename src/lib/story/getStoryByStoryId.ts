import { StoryByStoryIdResponse } from "../../typesAndInterfaces/getStoryByStoryId";

async function getStoryByStoryIdFn({
  story_id,
}: {
  story_id: string;
}): Promise<StoryByStoryIdResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/story/getStoryByStoryId?story_id=${story_id}`;

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
export default getStoryByStoryIdFn;
