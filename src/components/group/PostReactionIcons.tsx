import { useState } from "react";
import increaseClubPostLikesFn from "../../lib/club/increaseClubPostLikes";
import decreaseClubPostLikesFn from "../../lib/club/decreaseClubPostLikes";
import styles from "./styles/postReactionIcons.module.css";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import Cookies from "js-cookie";

type Props = {
  club_post_id: number;
  club_post_likes?: string;
  setShowCommentsArea?: React.Dispatch<React.SetStateAction<boolean>>;
};

function PostReactionIcons({
  club_post_id,
  club_post_likes,
  setShowCommentsArea,
}: Props) {
  const [showLikedIcon, setShowLikedIcon] = useState(false);
  const [shareGroupDiv, setShareGroupDiv] = useState(false);
  const token = Cookies.get("token");

  async function handleIncreaseClubPostClick(club_post_id: number) {
    try {
      await increaseClubPostLikesFn({ club_post_id });
      setShowLikedIcon(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handledecreaseClubPostClick(club_post_id: number) {
    try {
      await decreaseClubPostLikesFn({ club_post_id });
      setShowLikedIcon(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleShareGroupDivToggle() {
    setShareGroupDiv((prev) => !prev);
  }

  function handleShowCommentsArea() {
    if (!setShowCommentsArea) return;
    setShowCommentsArea((prev) => !prev);
  }

  return (
    <div className={styles.postReactionContainer}>
      {token && (
        <div>
          {!showLikedIcon ? (
            <>
              <img
                src="/bx_like.svg"
                alt="like icon"
                onClick={(e) => handleIncreaseClubPostClick(club_post_id)}
              />{" "}
              <p>Like</p>
            </>
          ) : (
            <>
              <img
                src="/bx_like.svg"
                alt="like icon"
                onClick={(e) => handledecreaseClubPostClick(club_post_id)}
              />{" "}
              <p>UnLike</p>
            </>
          )}
        </div>
      )}
      <div>
        <img
          src="/mdi_comment-outline.svg"
          alt="comment"
          onClick={handleShowCommentsArea}
        />{" "}
        <p>Comment</p>
      </div>
      {/*<div>
         <div>
          {shareGroupDiv && (
            <div>
              <div className="Demo__some-network">
                <WhatsappShareButton
                  url={`http://localhost:3001/group/`}
                  title={`Pride of Nigeria | `}
                  separator=":: "
                  className={`Demo__some-network__share-button `}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              <div className="Demo__some-network">
                <FacebookShareButton
                  url={`https://localhost:3001/group/`}
                  className={`Demo__some-network__share-button `}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div className="Demo__some-network">
                <TwitterShareButton
                  url={`http://localhost:3001/group/}`}
                  title={`Pride of Nigeria | `}
                  className={`Demo__some-network__share-button `}
                >
                  <XIcon size={32} round />
                </TwitterShareButton>
              </div>
              <div className="Demo__some-network">
                <LinkedinShareButton
                  url={`http://localhost:3001/group/`}
                  className={`Demo__some-network__share-button `}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            </div>
          )}
        </div> 
        <img
          src="/clubpostshare.svg"
          alt="comment"
          onClick={handleShareGroupDivToggle}
        />{" "}
        <p>Share</p>
      </div>*/}
      <div>
        <p>{club_post_likes} views</p>
      </div>
    </div>
  );
}
export default PostReactionIcons;
