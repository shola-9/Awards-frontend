import { useQuery } from "@tanstack/react-query";
import fetchPostsFn from "../../lib/fetchPosts";
import { Post } from "../../typesAndInterfaces/plan";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const WinnersOnHomePage = (): JSX.Element => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsFn,
  });

  // check if data is loading
  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  // check for error
  if (postsQuery.isError) return <p>No data yet. Check back later</p>;

  const content = postsQuery.data?.message.map((post: Post, index: number) => {
    // Sanitize the HTML content here
    const sanitizedContent = DOMPurify.sanitize(post.post, {
      ALLOWED_TAGS: ["p", "strong", "u", "br"],
      USE_PROFILES: {
        html: true,
      },
    });

    const shortenedContent =
      sanitizedContent.length > 129
        ? sanitizedContent.slice(0, 127) + "..."
        : sanitizedContent;

    return (
      <Link
        to={`/post/${post.id}`}
        key={post.id}
        className={` ${
          index === 0
            ? styles.firstItem
            : index === 1
            ? styles.secondItem
            : index === 2
            ? styles.thirdItem
            : styles.item
        }`}
      >
        <img
          src={post.picture}
          alt={post.name}
          className={styles.winnerImg}
        />
        <div className={styles.text}>
          <div className={styles.nameAndSubHeadingDiv}>
            <h5>{post.name}</h5>
            <p className={styles.subHeading}>{post.sub_heading}</p>
          </div>

          {/* Render the sanitized HTML */}
          {parse(shortenedContent)}
        </div>
      </Link>
    );
  });

  // map the posts and return the jsx
  return <div className={styles.winnersContainer}>{content}</div>;
};

export default WinnersOnHomePage;
