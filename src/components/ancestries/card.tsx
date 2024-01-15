import { Link } from "react-router-dom";
import { AncestriesPost } from "../../typesAndInterfaces/ancestries";
import styles from "../../pages/styles/ancestries/main.module.css";
function Card({ post }: { post: AncestriesPost }) {
  return (
    <div
      key={post.ancestries_postid}
      className={styles.main}
    >
      <div className={styles.imgContainer}>
        <img
          src={post.img_urls.split(",")[1]}
          alt={"Photo of " + post.post_sub_heading}
        />
        <p className={styles.subHeading}>{post.post_sub_heading}</p>
      </div>
      <div>
        <p className={styles.content}>{post.content.slice(0, 100) + "..."}</p>
        <Link to={`/ancestries/${post.ancestries_postid}`}>EXPLORE</Link>
      </div>
    </div>
  );
}
export default Card;
