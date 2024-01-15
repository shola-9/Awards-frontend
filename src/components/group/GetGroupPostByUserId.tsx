import { useQuery } from "@tanstack/react-query";
import styles from "./styles/getGroupPosts.module.css";
import stylesOne from "./styles/profilePageClubPostDisplay.module.css";
import { formatTimestampDiff } from "../global/formatTimeAgo";
import PostReactionIcons from "./PostReactionIcons";
import getClubPostsByUserIdFn from "../../lib/club/getClubPostByUserId";

function GetGroupPostsByUserId() {
  const getGroupPostsByUserIdQuery = useQuery({
    queryKey: ["getPostsByUserId"],
    queryFn: getClubPostsByUserIdFn,
  });

  if (getGroupPostsByUserIdQuery.isLoading) return <p>loading...</p>;
  if (getGroupPostsByUserIdQuery.isError)
    return <p>No data yet. Check back later</p>;
  if (!getGroupPostsByUserIdQuery.data) return <p>no data</p>;

  if ("clubPosts" in getGroupPostsByUserIdQuery.data) {
    const { data } = getGroupPostsByUserIdQuery;

    // Map the array of posts to an array of JSX elements
    const postElements = data.clubPosts.map((post) => (
      <div
        key={post.club_post_id}
        className={styles.clubPostContainer}
      >
        <div className={styles.clubPostContentArea}>
          <div className={styles.clubPostHeader}>
            <div className={styles.userInfoAndPostTime}>
              <div>
                {post.user_img ? (
                  <img
                    src={post.club_img}
                    alt="user"
                  />
                ) : (
                  <img
                    src="/Ellipse 49.svg"
                    alt="user"
                  />
                )}
              </div>
              <div>
                <p className={stylesOne.clubName}>{post.club_name}</p>
                <div className={stylesOne.usernameAndTime}>
                  <p>{post.username}</p> <p className={stylesOne.dot}>.</p>
                  <p>{formatTimestampDiff(post.club_post_created_at)}</p>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.clubPostTag}>{post.club_post_tag}</p>
            </div>
          </div>
          <p className={styles.clubPostContent}>{post.club_post_content}</p>
          <hr />
          <PostReactionIcons club_post_id={post.club_post_id} />
          <hr />
          <div>
            {post.club_post_comments !== null &&
              post.club_post_comments
                .split(",")
                .map((comment) => <p key={comment}>{comment}</p>)}
          </div>
        </div>
      </div>
    ));

    // Return the array of JSX elements
    return <div>{postElements}</div>;
  } else if ("message" in getGroupPostsByUserIdQuery.data) {
    const { message } = getGroupPostsByUserIdQuery.data;
    return <p>{message}</p>;
  } else {
    return <p>No data</p>;
  }
}

export default GetGroupPostsByUserId;
