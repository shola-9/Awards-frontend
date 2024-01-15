import { AncestriesPostComment } from "../../typesAndInterfaces/ancestriesPostComments";
import styles from "../../../src/components/ancestries/styles/commentsDisplay.module.css";

function GetCommentsById(comment: AncestriesPostComment) {
  return (
    <div className={styles.commentsContainerAPC}>
      <div>
        {comment.user_img ? (
          <img
            src={comment.user_img}
            alt={"Photo of " + comment.username}
          />
        ) : (
          <img
            src="/Ellipse 49.svg"
            alt="empty profile"
          />
        )}
      </div>
      <div>
        <h3>{comment.username}</h3>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}
export default GetCommentsById;
