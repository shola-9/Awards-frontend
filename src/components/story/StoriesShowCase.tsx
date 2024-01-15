import { useQuery } from "@tanstack/react-query";
import getAllStoriesFn from "../../lib/story/getAllStories";
import { Link } from "react-router-dom";
import styles from "../../components/story/styles/storiesShowCase.module.css";
import { useState } from "react";

function StoriesShowCase() {
  let [counter, setCounter] = useState(0);
  const storiesShowCaseQuery = useQuery({
    queryKey: ["storiesShowCase"],
    queryFn: getAllStoriesFn,
  });

  if (storiesShowCaseQuery.isLoading) return <p>loading</p>;

  if (storiesShowCaseQuery.isError) {
    if (storiesShowCaseQuery.error.message.includes("404")) {
      return <p>No stories yet. Check back later</p>;
    }

    return counter <= 3 ? ( // Use counter directly in comparison
      <div>
        <p>
          Failed to load data.{" "}
          <button
            onClick={() => {
              storiesShowCaseQuery.refetch();
              setCounter((prev) => prev + 1);
            }}
          >
            Try again
          </button>{" "}
          later.
        </p>
      </div>
    ) : (
      <p>Internal server error. Try again later.</p>
    );
  }

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
            <img
              src="/Ellipse 49.svg"
              alt="profile"
            />
          )}
          {story.username ? <p>{story.username}</p> : <p>No username</p>}
        </Link>
      ))}
    </div>
  );
}
export default StoriesShowCase;
