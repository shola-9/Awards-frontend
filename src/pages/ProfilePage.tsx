import SubHeading from "../components/app/SubHeading";
import CreateUserInfoForm1 from "../components/users/CreateUserInfoForm";
import { useQuery } from "@tanstack/react-query";
import getUserInfoFn from "../lib/user/getUserInfo";
import styles from "./styles/profile.module.css";
import stylesOne from "./styles/profile/profileDetails.module.css";
import { UploadStoryArea } from "../components/users/UploadStoryArea";
import StoriesShowCase from "../components/story/StoriesShowCase";
import StoryByUserId from "../components/story/StoryByUserId";
import GetGroupPostsByUserId from "../components/group/GetGroupPostByUserId";
import logOutFn from "../lib/user/logOut";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChangePasswordForm from "../components/users/ChangePasswordForm";
import Cookies from "js-cookie";

function ProfilePage() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showChangePasswordArea, setShowChangePasswordArea] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const profileInfoQuery = useQuery({
    queryKey: ["profileInfo"],
    queryFn: getUserInfoFn,
  });

  function handleShowMore() {
    setShowMore((prev) => !prev);
    if (showChangePasswordArea) {
      setShowChangePasswordArea(false);
    }
  }

  async function handleLogOut() {
    await logOutFn();
    navigate("/");
  }

  if (profileInfoQuery.isLoading) return <h1>Loading...</h1>;
  if (profileInfoQuery.isError) return <p>No data yet. Check back later</p>; // most likely, redirect to login page.

  if (!profileInfoQuery.data) return <h1>No data</h1>;
  if (
    !profileInfoQuery.data.user.users_phone_number &&
    !profileInfoQuery.data.user.user_img
  )
    return <CreateUserInfoForm1 />;
  return (
    <div className={styles.container}>
      <SubHeading value="PROFILE" />
      {profileInfoQuery.data.user.users_phone_number && (
        <div className={stylesOne.profileDetails}>
          <div>
            {profileInfoQuery.data.user.user_img ? (
              <img
                src={profileInfoQuery.data.user.user_img}
                alt="profile"
              />
            ) : (
              <img
                src="/Ellipse 48.svg"
                alt="profile"
              />
            )}
          </div>
          <div className={stylesOne.details}>
            <div>
              <p className={stylesOne.username}>
                {profileInfoQuery.data.user.username}
              </p>
            </div>
            <div className={stylesOne.contactDetails}>
              <p>{profileInfoQuery.data.user.users_phone_number}</p>
              <p>{profileInfoQuery.data.user.email}</p>
            </div>
          </div>
          <div className={stylesOne.moreContainer}>
            <div>
              <button
                className={stylesOne.moreBtn}
                onClick={handleShowMore}
              >
                More{" "}
                {showMore ? (
                  <img
                    src="/Vector 19b.svg"
                    alt="down arrow"
                  />
                ) : (
                  <img
                    src="/Vector 19.svg"
                    alt="up arrow"
                  />
                )}
              </button>
            </div>
            {showMore && (
              <div className={stylesOne.moreDetails}>
                <div>
                  <button
                    onClick={(e) => setShowChangePasswordArea((prev) => !prev)}
                  >
                    Change password
                  </button>
                </div>
                <div>
                  <button onClick={handleLogOut}>Log out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showChangePasswordArea && <ChangePasswordForm />}
      <div className={stylesOne.divider}></div>
      <div className={styles.storyDiv}>
        <h4>Stories</h4>
        <StoriesShowCase />
      </div>
      <div className={styles.profileBodyContainer}>
        <section className={styles.profileBodyArea}>
          <h4>Post</h4>
          <div className={styles.storyArea}>
            <UploadStoryArea profileImg={profileInfoQuery.data.user.user_img} />
            <StoryByUserId />
          </div>
          <div style={{ width: "100%" }}>
            <GetGroupPostsByUserId />
          </div>
        </section>
        <section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          consequatur eveniet recusandae officiis minima, iure in quis, quo
          explicabo autem excepturi labore hic ducimus culpa! Excepturi commodi,
          expedita deleniti inventore quia nam delectus magni, minima nisi
          deserunt aperiam? Alias nulla ipsam quis totam illum omnis hic
          expedita fugiat? Nobis eum adipisci minus corporis tenetur modi eos,
          quibusdam, ut, voluptatibus reprehenderit quia enim minima eius animi
          ex consequatur suscipit nisi doloribus porro aut dolor. Repellendus
          soluta voluptate non numquam iste eveniet minus obcaecati inventore
          illo. Dolore dolorem rem vero id deserunt. Dolor quod dolore facere
          iste fugit unde quibusdam dignissimos, quia neque quas sunt maiores
          praesentium natus aperiam facilis voluptatum assumenda molestiae
          pariatur! Repudiandae esse maiores quod, magnam soluta quisquam eos
          voluptas, assumenda nostrum, saepe dolores. Repellendus beatae
          molestias ipsum numquam velit impedit? Non suscipit dolorem error
          earum omnis cumque, soluta illo vero. Maiores nisi quod voluptas,
          praesentium quis, quam aliquam officia reprehenderit corporis aut
          maxime deleniti necessitatibus minima optio, aperiam veniam architecto
          nesciunt in tenetur neque quidem voluptatum porro laudantium nobis.
          Aliquid sit impedit, delectus ratione sapiente enim voluptates
          officia, quibusdam cumque nostrum magnam facilis a amet blanditiis
          vitae accusamus quod voluptas. Vero officia voluptatem odit laborum
          ratione facilis quisquam?
        </section>
      </div>
    </div>
  );
}
export default ProfilePage;
