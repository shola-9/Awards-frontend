export interface AncestriesPostResponse {
  ancestries_posts: AncestriesPost[];
}

export interface AncestriesPost {
  ancestries_postid: number;
  post_heading: string;
  post_sub_heading: string;
  age: number;
  sex: number;
  email: string;
  address: string;
  state: string;
  nationality: string;
  date_year: number;
  content: string;
  user_id: number;
  img_urls: string;
  comment_count: number;
}

async function getAncestriesPostByIdFn(
  ancestries_postid: string
): Promise<AncestriesPostResponse> {
  // returns the most current posts
  const url = `https://e-awards.ooshinfo.com/api/v1/ancestries/getAncestriesPostById?ancestries_postid=${ancestries_postid}`;

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
export default getAncestriesPostByIdFn;
