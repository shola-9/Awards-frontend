import SubHeading from "../components/app/SubHeading";
import { Club, ClubOption } from "../typesAndInterfaces/club";
import styles from "./styles/dynamicGroupPageReusable.module.css/mainContainer.module.css";
import stylesOne from "./styles/dynamicGroupPageReusable.module.css/ImgArea.module.css";
import stylesTwo from "./styles/dynamicGroupPageReusable.module.css/body.module.css";
import stylesThree from "./styles/dynamicGroupPageReusable.module.css/aboutGroupsArea.module.css";
import stylesFour from "./styles/dynamicGroupPageReusable.module.css/otherGroupsArea.module.css";
import stylesFive from "./styles/dynamicGroupPageReusable.module.css/createGroupPostArea.module.css";
import CreateGroupPostForm from "../components/group/CreateGroupPostForm";
import GetGroupPosts from "../components/group/GetGroupPosts";
import { useQuery } from "@tanstack/react-query";
import createMemberFn from "../lib/club/createMember";
import getClubMember4JoinBtnFn from "../lib/club/getClubMember4JoinBtn";
import deleteClubMemberFn from "../lib/club/deleteClubMember";
import { useState } from "react";
import DisplayGroupMembers from "../components/group/DisplayGroupMembers";
import { Link } from "react-router-dom";
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
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  club: Club;
  clubOptions: ClubOption[];
  club_id?: string;
  profile?: string | null;
};

function DynamicGroupPageReusable({
  club,
  clubOptions,
  club_id,
  profile,
}: Props) {
  const [showPost, setShowPost] = useState(true);
  const [showJoinBtn, setShowJoinBtn] = useState(true);
  const [shareGroupDiv, setShareGroupDiv] = useState(false);
  const [tokenStore, setTokenStore] = useState("");
  const [postAuthErr, setPostAuthErr] = useState(false);
  const [postIsActiveBtn, setPostIsActiveBtn] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    setTokenStore(token ?? "");
  }, [tokenStore]);

  const createMemberQuery = useQuery({
    queryKey: ["createMember", club_id],
    queryFn: () => {
      if (!club_id) {
        throw new Error("club_id is required");
      }
      return createMemberFn({ club_id });
    },
    enabled: false,
  });

  const showJoinBtnQuery = useQuery({
    queryKey: ["showJoinBtn", club_id],
    queryFn: () => {
      if (!club_id) {
        throw new Error("club_id is required");
      }
      return getClubMember4JoinBtnFn({ club_id });
    },
    // enabled: false,
  });

  const unJoinGroupQuery = useQuery({
    queryKey: ["unJoinGroup", club_id],
    queryFn: () => {
      if (!club_id) {
        throw new Error("club_id is required");
      }
      return deleteClubMemberFn({ club_id });
    },
    enabled: false,
  });

  function handleCreateMemberSubmit() {
    createMemberQuery.refetch();
    setShowJoinBtn(false);
  }

  function handleUnJoinGroupSubmit() {
    unJoinGroupQuery.refetch();
    setShowJoinBtn(true);
  }

  function handleShowMembers() {
    setShowPost(false);
    setPostIsActiveBtn(false);
  }

  function handleShowPosts() {
    setShowPost(true);
    setPostIsActiveBtn(true);
  }

  function handleShareGroupDivToggle() {
    setShareGroupDiv((prev) => !prev);
  }

  if (showJoinBtnQuery.isLoading) return <h1>Loading...</h1>;
  if (showJoinBtnQuery.isError) return <p>No data yet. Check back later</p>;
  if (!showJoinBtnQuery.data) return <h1>Nothing</h1>;

  return (
    <section className={styles.mainContainer} style={{ padding: 0, margin: 0 }}>
      <SubHeading value="GROUP" />
      <div className={stylesOne.imgArea}>
        <img src="/Rectangle 108.svg" alt="group" />
      </div>
      <section className={stylesOne.viewMembersOrPostArea}>
        <div>
          <button
            className={`${postIsActiveBtn ? styles.green : styles.nonActive} `}
            onClick={handleShowPosts}
          >
            Post
          </button>
          <button
            onClick={handleShowMembers}
            className={`${!postIsActiveBtn ? styles.green : styles.nonActive} `}
          >
            Members
          </button>
        </div>
        {tokenStore && (
          <div>
            {"message" in showJoinBtnQuery.data && showJoinBtn ? (
              <button
                className={`${styles.green}`}
                onClick={handleCreateMemberSubmit}
              >
                Join Group
              </button>
            ) : (
              <button
                className={`${styles.green}`}
                onClick={handleUnJoinGroupSubmit}
              >
                Un-Join Group
              </button>
            )}
          </div>
        )}
      </section>
      <section className={stylesTwo.body}>
        <div className={stylesTwo.firstHalfContent}>
          <div className={stylesFive.createGroupPostArea}>
            <div className={stylesFive.userImg}>
              {profile ? (
                <img src={profile} alt="group" />
              ) : (
                <img src="/Ellipse 48.svg" alt="group" />
              )}
            </div>
            <div className={stylesTwo.createGroupPostDiv}>
              <CreateGroupPostForm
                setPostAuthErr={setPostAuthErr}
                club_id={club_id}
              />
            </div>
          </div>
          <div>
            {postAuthErr && (
              <p className={stylesFive.postErr}>
                Please{" "}
                <Link
                  to="/login"
                  className={stylesFive.loginLink}
                  state={{ from: location }}
                  replace
                >
                  login
                </Link>{" "}
                or{" "}
                <Link
                  to="/sign-up"
                  className={stylesFive.loginLink}
                  state={{ from: location }}
                  replace
                >
                  sign up
                </Link>{" "}
                to create post, comment or like.
              </p>
            )}
          </div>
          <div>
            {showPost ? (
              <GetGroupPosts club_id={club_id} />
            ) : (
              <DisplayGroupMembers club_id={club_id} />
            )}
          </div>
        </div>
        <div className={stylesTwo.secondHalfContent}>
          <div className={stylesThree.aboutGroupsArea}>
            <h4>About Group</h4>
            <p>{club.about_club}</p>
            <div className={stylesThree.shareGroupDiv}>
              {shareGroupDiv && (
                <div className={stylesThree.socialIconsDiv}>
                  <div className="Demo__some-network">
                    <WhatsappShareButton
                      url={`http://localhost:3001/group/${club.club_id}`}
                      title={`Pride of Nigeria | ${club.club_name}`}
                      separator=":: "
                      className={`Demo__some-network__share-button ${stylesThree.icon}`}
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <FacebookShareButton
                      url={`https://localhost:3001/group/${club.club_id}`}
                      className={`Demo__some-network__share-button ${stylesThree.icon}`}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <TwitterShareButton
                      url={`http://localhost:3001/group/${club.club_id}`}
                      title={`Pride of Nigeria | ${club.club_name}`}
                      className={`Demo__some-network__share-button ${stylesThree.icon}`}
                    >
                      <XIcon size={32} round />
                    </TwitterShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <LinkedinShareButton
                      url={`http://localhost:3001/group/${club.club_id}`}
                      className={`Demo__some-network__share-button ${stylesThree.icon}`}
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                className={`${styles.green}`}
                onClick={handleShareGroupDivToggle}
              >
                Share Group
              </button>
            </div>
          </div>
          <div className={stylesFour.otherGroupsArea}>
            <h4>Other Groups</h4>
            <div className={stylesFour.cardContainer}>
              {clubOptions.map((option) => (
                <div key={option.club_id} className={stylesFour.card}>
                  <img src={option.club_img} alt={option.club_name} />
                  <div className={stylesFour.contentCard}>
                    <h5>
                      {option.club_name.length > 10
                        ? `${option.club_name.slice(0, 10)}...`
                        : option.club_name}
                    </h5>
                    <div className={stylesFour.membersAndPosts}>
                      <p>
                        {option.members_count === 1
                          ? `${option.members_count} member`
                          : `${option.members_count} members`}
                      </p>
                      <p>
                        {option.posts_last_24h_count === 1
                          ? `${option.posts_last_24h_count} post today`
                          : `${option.posts_last_24h_count} posts today`}
                      </p>
                    </div>
                    <Link
                      to={`/group/${option.club_id}`}
                      className={`${styles.green} ${stylesFour.joinBtn}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <p></p>
    </section>
  );
}
export default DynamicGroupPageReusable;
