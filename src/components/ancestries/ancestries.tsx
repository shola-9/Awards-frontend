import { useQuery } from "@tanstack/react-query";
import styles from "../../../src/pages/styles/home.module.css";
import getAncestriesPostFn from "../../lib/ancestries/get";
import { Link } from "react-router-dom";

function Ancestries() {
  const ancestriesQuery = useQuery({
    queryKey: ["ancestries"],
    queryFn: () => getAncestriesPostFn(),
  });

  if (ancestriesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (ancestriesQuery.isError) {
    return <p>No data yet. Check back later</p>;
  }

  return (
    <div className={styles.exploreNewDevelopmentWidthController}>
      <h4>
        Explore new Development in Nigeria and Nigerian Achievers - both Home
        and Abroad
      </h4>
      <p className={styles.subHeading}>
        Nigerians doing well all over the world
      </p>
      <div className={styles.exploreNewDevelopmentCardContainer}>
        {ancestriesQuery.data?.ancestries_posts.map((post) => (
          <div
            className={styles.exploreNewDevelopmentCard}
            key={post.ancestries_postid}
          >
            <div>
              <img
                src={post.img_urls.split(",")[1]}
                alt={"Photo of " + post.post_sub_heading}
              />
              <p className={styles.ancestryFamilyTree}>
                {post.post_sub_heading}
              </p>
            </div>
            <div>
              <p className={styles.contentForExploreNewSection}>
                {post.content.slice(0, 100) + "..."}
              </p>
              <Link
                to={`/ancestries/${post.ancestries_postid}`}
                className={styles.exploreNewDevelopmentCardExploreBtn}
              >
                EXPLORE
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.seeMoreDiv}>
        <Link to={"/ancestry-posts"}>See more</Link>
      </div>
    </div>
  );
}
export default Ancestries;
