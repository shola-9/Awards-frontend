import addCommentToPostFn from "../../lib/club/addCommentToPost";
import { useState } from "react";
import styles from "./styles/addComments.module.css";

function AddCommentToClubPost({ club_post_id }: { club_post_id: number }) {
  const [club_post_comment, setClub_post_comment] = useState("");

  const disabled = !club_post_comment;
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!club_post_id && !club_post_comment) return;
    const res = await addCommentToPostFn({ club_post_id, club_post_comment });
    if (!res.ok) {
      return;
    }
    console.log("clicked" + res);
    setClub_post_comment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="club_post_comment"></label>
        <input
          type="text"
          name="club_post_comment"
          value={club_post_comment}
          id="club_post_comment"
          onChange={(e) => setClub_post_comment(e.target.value)}
          placeholder="Write Something..."
          required
          className={styles.input}
        />
      </div>
      <div className={styles.btnDiv}>
        <button disabled={disabled}>Submit</button>
      </div>
    </form>
  );
}
export default AddCommentToClubPost;
