import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getStoryByStoryIdFn from "../lib/story/getStoryByStoryId";
import styles from "./styles/dynamicStories.module.css";
import SubHeading from "../components/app/SubHeading";

function DynamicStoriesPage() {
  const { story_id } = useParams();

  const getStoryByStoryQuery = useQuery({
    queryKey: ["getStoryByStory", story_id],
    queryFn: () => {
      if (!story_id) {
        throw new Error("story_id is required");
      }
      return getStoryByStoryIdFn({ story_id });
    },
  });

  if (getStoryByStoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (getStoryByStoryQuery.isError) {
    return <p>No data yet. Check back later</p>;
  }
  if (!getStoryByStoryQuery.data) {
    return <div>No data to return</div>;
  }
  return (
    <div>
      <SubHeading value="Stories" />
      <div className={styles.container}>
        {getStoryByStoryQuery.data.stories.map((story, index) => (
          <div
            key={story.story_id}
            className={
              index === 0 ? `${styles.firstStory}` : `${styles.otherStories}`
            }
          >
            <video
              controls
              className={styles.video}
            >
              <source
                src={story.story}
                type="video/mp4"
              />
              <source
                src={story.story}
                type="video/webm"
              />
              <source
                src={story.story}
                type="video/mov"
              />
              <source
                src={story.story}
                type="video/avi"
              />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DynamicStoriesPage;
