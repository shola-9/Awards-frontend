import { useQuery } from "@tanstack/react-query";
import getClubPostsFn from "../../lib/club/getClubPosts";
import styles from "./styles/getGroupPosts.module.css";
import { formatTimestampDiff } from "../global/formatTimeAgo";
import PostReactionIcons from "./PostReactionIcons";
import updateClubPostViewsFn from "../../lib/club/updateClubPostViews";
import AddCommentToClubPost from "./AddCommentToClubPost";
import { useState } from "react";

type Props = {
  club_id?: string;
};

function GetGroupPosts({ club_id }: Props) {
  const [showCommentsArea, setShowCommentsArea] = useState(false);
  const getGroupPosts = useQuery({
    queryKey: ["getGroupPosts"],
    queryFn: () => {
      if (!club_id) {
        throw new Error("club_id is required");
      }
      return getClubPostsFn({ club_id });
    },
  });

  if (getGroupPosts.isLoading) return <p>loading...</p>;
  if (getGroupPosts.isError) return <p>No data yet. Check back later</p>;
  if (!getGroupPosts.data) return <p>no data</p>;

  async function handleClubPostViews(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    club_post_id: number
  ) {
    e.preventDefault();
    try {
      await updateClubPostViewsFn({ club_post_id });
    } catch (error) {
      console.log(error);
    }
  }

  if ("clubPosts" in getGroupPosts.data) {
    const { data } = getGroupPosts;

    // Map the array of posts to an array of JSX elements
    const postElements = data.clubPosts.map((post) => (
      <div key={post.club_post_id} className={styles.clubPostContainer}>
        <div
          className={styles.clubPostContentArea}
          onMouseLeave={(e) => handleClubPostViews(e, post.club_post_id)}
        >
          <div className={styles.clubPostHeader}>
            <div className={styles.userInfoAndPostTime}>
              <div>
                {post.user_img ? (
                  <img src={post.user_img} alt="user" />
                ) : (
                  <img src="/Ellipse 49.svg" alt="user" />
                )}
              </div>
              <div>
                <p>{post.username}</p>
                <p>{formatTimestampDiff(post.club_post_created_at)}</p>
              </div>
            </div>
            <div>
              <p className={styles.clubPostTag}>{post.club_post_tag}</p>
            </div>
          </div>
          <p className={styles.clubPostContent}>{post.club_post_content}</p>
          <div className={styles.imagesParent}>
            {post.image_urls && post.image_urls.split(",")[0] && (
              <div className={styles.imgDiv}>
                <img src={post.image_urls.split(",")[0]} alt="post" />
              </div>
            )}
            {post.image_urls && post.image_urls.split(",")[1] && (
              <div className={styles.imgDiv}>
                <img src={post.image_urls.split(",")[1]} alt="post" />
              </div>
            )}
            {post.image_urls && post.image_urls.split(",")[2] && (
              <div className={`${styles.imgDiv} ${styles.thirdImg}`}>
                <img src={post.image_urls.split(",")[2]} alt="post" />
              </div>
            )}
          </div>
          <hr />
          <PostReactionIcons
            club_post_likes={post.club_post_views.toString()}
            club_post_id={post.club_post_id}
            setShowCommentsArea={setShowCommentsArea}
          />
          <hr />
          {showCommentsArea && (
            <>
              <div>
                {post.club_post_comments !== null &&
                  post.club_post_comments
                    .split(",")
                    .map((comment) => <p key={comment}>{comment}</p>)}
              </div>
              <div>
                <AddCommentToClubPost club_post_id={post.club_post_id} />
              </div>
            </>
          )}
        </div>
      </div>
    ));

    // Return the array of JSX elements
    return <div>{postElements}</div>;
  } else {
    const { message } = getGroupPosts.data;
    return <p>{message}</p>;
  }
}

export default GetGroupPosts;
