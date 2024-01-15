import { useQuery } from "@tanstack/react-query";
import getStoryByUserIdFn from "../../lib/story/getStoryByUserId";
import styles from "./styles/storyByUserId.module.css";
function StoryByUserId() {
  const storyByIdQuery = useQuery({
    queryKey: ["story"],
    queryFn: getStoryByUserIdFn,
  });

  if (storyByIdQuery.isLoading) return <p>loading.</p>;
  if (storyByIdQuery.isError) return <p>No data yet. Check back later</p>;
  if (storyByIdQuery.data?.stories === undefined)
    return <p>No story found. Post one now.</p>;

  return (
    <div className={styles.container}>
      {storyByIdQuery.data?.stories.map((story) => (
        <div
          key={story.story_id}
          className={styles.story}
        >
          <video
            src={story.story}
            controls
          ></video>
        </div>
      ))}
    </div>
  );
}
export default StoryByUserId;
