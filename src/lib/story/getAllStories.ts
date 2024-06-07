export interface GetAllStoriesResponse {
  stories: Story[];
}

export interface Story {
  story_id: number;
  story: string;
  user_id: number;
  username: string;
  user_img: null | string;
}

async function getAllStoriesFn(): Promise<GetAllStoriesResponse> {
  const url = "https://e-awards.ooshinfo.com/api/v1/story";

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
export default getAllStoriesFn;
