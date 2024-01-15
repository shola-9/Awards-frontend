import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getAncestriesPostByIdFn from "../lib/ancestries/getById";
import styles from "../pages/styles/dynamicAncestries/topSection.module.css";
import styles0 from "../../src/pages/styles/dynamic.module.css";
import styles1 from "../pages/styles/dynamicAncestries/bottomSection.module.css";
import SubHeading from "../components/app/SubHeading";
import { useState } from "react";
import Cookies from "js-cookie";
import postAncestriesCommentFn from "../lib/ancestries/addComment";
import { useLocation } from "react-router-dom";
import getAncestriesPostCommentsFn from "../lib/ancestries/getCommentsByPostId";
import GetCommentsById from "../components/ancestries/getCommentsById";

function DynamicAncestries() {
  const { ancestries_id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [authError, setAuthError] = useState(false);
  const location = useLocation();
  const token = Cookies.get("token");

  if (!ancestries_id) {
    throw new Error("ancestries_id is required");
  }

  const getAncestriesByIdQuery = useQuery({
    queryKey: ["getAncestriesById", ancestries_id],
    queryFn: () => {
      if (!ancestries_id) {
        throw new Error("ancestries_id is required");
      }
      return getAncestriesPostByIdFn(ancestries_id);
    },
  });

  const commentsQuery = useQuery({
    queryKey: ["ancestriesPostComments"],
    queryFn: () =>
      getAncestriesPostCommentsFn({ ancestries_postid: ancestries_id }),
  });

  const comments = commentsQuery.data?.ancestries_post_comments.map(
    (comment) => (
      <GetCommentsById
        key={comment.comment_id}
        {...comment}
      />
    )
  );

  if (getAncestriesByIdQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (getAncestriesByIdQuery.isError) {
    return <p>No data yet. Check back later</p>;
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ancestries_id) return;
    if (!token) {
      setAuthError(true);
      return;
    }
    await postAncestriesCommentFn({
      post_id: ancestries_id,
      comment,
    });
    setAuthError(false);
    setComment("");
  }

  return (
    <>
      <SubHeading value="Nigeria New developer" />
      <div className={styles.body}>
        {getAncestriesByIdQuery.data?.ancestries_posts.map((ancestries) => (
          <div key={ancestries.ancestries_postid}>
            <div className={styles.topSection}>
              <div className={styles.imgDiv}>
                <img
                  src={ancestries.img_urls.split(",")[0]}
                  alt={ancestries.post_heading}
                />
              </div>
              <div className={styles.infoArea}>
                <div className={styles.headingArea}>
                  <h3>{ancestries.post_heading}</h3>
                  <p className={styles.commentCount}>
                    <img
                      src="/Vector.svg"
                      alt="commentIcon"
                      className={styles.commentIcon}
                    />
                    {ancestries.comment_count}
                  </p>
                </div>
                <div className={styles.subHeadingArea}>
                  <p>{ancestries.post_sub_heading}</p>
                  <p>{ancestries.date_year}</p>
                </div>
                <div className={styles.extraInfo}>
                  <p>
                    <span>Age:</span> {ancestries.age}
                  </p>
                  <p>
                    <span>Sex:</span> {ancestries.sex === 1 ? "M" : "F"}
                  </p>
                  <p>
                    <span>Email:</span> {ancestries.email}
                  </p>
                  <p>
                    <span>Address:</span> {ancestries.address}
                  </p>
                  <p>
                    <span>State:</span> {ancestries.state}
                  </p>
                  <p>
                    <span>Nationality:</span> {ancestries.nationality}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles1.bottomSection}>
              <p>{ancestries.content.replace(/^(.{0,8}).*$/, "$1...")}</p>
              <div className={styles1.imgDiv}>
                <img
                  src={ancestries.img_urls.split(",")[1]}
                  alt={ancestries.post_heading}
                />
              </div>
              <p>
                {ancestries.content.substring(
                  Math.floor(ancestries.content.length * 0.9)
                )}
              </p>
            </div>
            <form
              className={styles0.postCommentSection}
              onSubmit={handleFormSubmit}
            >
              <div className={styles0.postCommentHeadingAndButtonDiv}>
                <h4 className={styles0.postCommentHeader}>Drop a Comment</h4>
                <button>Submit</button>
              </div>
              <div>
                {authError && (
                  <p className={styles1.authError}>
                    Please{" "}
                    <Link
                      to={"/login"}
                      state={{ from: location }}
                      replace
                    >
                      login
                    </Link>{" "}
                    or{" "}
                    <Link
                      to={"/signup"}
                      state={{ from: location }}
                      replace
                    >
                      sign up
                    </Link>{" "}
                    to comment
                  </p>
                )}
              </div>
              {!token && (
                <div className={styles0.postCommentForm}>
                  <div className={styles0.singleLabelAndInput}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      aria-required
                    />
                  </div>
                  <div className={styles0.singleLabelAndInput}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-required
                    />
                  </div>
                </div>
              )}
              <div className={styles0.postCommentTextareaDiv}>
                <label htmlFor="comment">
                  Why do they deserve the award? (Please include as much detail
                  as possible):
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  aria-required
                />
              </div>
            </form>
          </div>
        ))}
      </div>
      <div className={styles1.commentsArea}>{comments}</div>
    </>
  );
}
export default DynamicAncestries;
