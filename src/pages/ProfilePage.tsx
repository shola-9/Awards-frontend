import SubHeading from "../components/app/SubHeading";
import CreateUserInfoForm1 from "../components/users/CreateUserInfoForm";
import { useQuery } from "@tanstack/react-query";
import getUserInfoFn from "../lib/user/getUserInfo";
import styles from "./styles/profile.module.css";
import stylesOne from "./styles/profile/profileDetails.module.css";
import { UploadStoryArea } from "../components/users/uploadStoryArea";
import StoriesShowCase from "../components/story/StoriesShowCase";
import StoryByUserId from "../components/story/StoryByUserId";
import GetGroupPostsByUserId from "../components/group/GetGroupPostByUserId";
import logOutFn from "../lib/user/logOut";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const profileInfoQuery = useQuery({
    queryKey: ["profileInfo"],
    queryFn: getUserInfoFn,
  });

  async function handleLogOut() {
    await logOutFn();
    navigate("/");
  }

  if (profileInfoQuery.isLoading) return <h1>Loading...</h1>;
  if (profileInfoQuery.isError) return <h1>Error</h1>;

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
              <img src={profileInfoQuery.data.user.user_img} alt="profile" />
            ) : (
              <img src="/Ellipse 48.svg" alt="profile" />
            )}
          </div>
          <div>
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
          <div>
            <button onClick={handleLogOut}>log out</button>
          </div>
          <div className={stylesOne.divider}></div>
        </div>
      )}
      <div className={styles.storyDiv}>
        <h4>Stories</h4>
        <StoriesShowCase />
      </div>
      <div
        style={{
          display: "flex",
          padding: "4rem",
          gap: "2rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <section className={styles.profileBodyArea}>
          <h4>Post</h4>
          <div className={styles.storyArea}>
            <UploadStoryArea profileImg={profileInfoQuery.data.user.user_img} />
            <StoryByUserId />
          </div>
          <div>
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
