import { Post } from "../../typesAndInterfaces/plan";
import Cookies from "js-cookie";

async function getPostByIdWithCommentsFn({
  post_id,
}: {
  post_id: string;
}): Promise<Post> {
  const token = Cookies.get("token");
  // returns the most current posts
  const url = `https://e-awards.ooshinfo.com/api/v1/posts/getPostByIdWithComments?post_id=${post_id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const data: Post = await res.json();

  return data;
}
export default getPostByIdWithCommentsFn;
