import { useQuery } from "@tanstack/react-query";
import getAllStoriesFn from "../../lib/story/getAllStories";
import { Link } from "react-router-dom";
import styles from "../../components/story/styles/storiesShowCase.module.css";

function StoriesShowCase() {
  const storiesShowCaseQuery = useQuery({
    queryKey: ["storiesShowCase"],
    queryFn: getAllStoriesFn,
  });

  if (storiesShowCaseQuery.isLoading) return <p>loading</p>;
  if (storiesShowCaseQuery.isError) return <p>Error</p>;
  return (
    <div className={styles.container}>
      {storiesShowCaseQuery.data?.stories.map((story) => (
        <Link
          to={`/story/${story.story_id}`}
          key={story.story_id}
          className={styles.story}
        >
          {story.user_img ? (
            <img
              src={story.user_img}
              alt="profile"
              className={styles.realImg}
            />
          ) : (
            <img src="/Ellipse 49.svg" alt="profile" />
          )}
          {story.username ? <p>{story.username}</p> : <p>No username</p>}
        </Link>
      ))}
    </div>
  );
}
export default StoriesShowCase;
