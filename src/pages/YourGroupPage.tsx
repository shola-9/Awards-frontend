import SubHeading from "../components/app/SubHeading";
import styles from "./styles/yourGroupRightHandSection.module.css";
import { Link, useNavigate } from "react-router-dom";
import stylesOne from "./styles/yourGroup/suggestedGroups.module.css";
import { useQuery } from "@tanstack/react-query";
import getGroupOptionLimit4Fn from "../lib/club/getClubOptionLimit4";
import stylesTwo from "./styles/yourGroup/yourFeed.module.css";
import GetGroupPostsByUserId from "../components/group/GetGroupPostByUserId";
import { useState, useEffect } from "react";
import searchForClubFn from "../lib/club/search";
import { ClubPostSearchResponse, ClubPostSearch } from "../lib/club/search";
import clubMembershipFn from "../lib/club/clubMembershipList";
import stylesThree from "./styles/yourGroup/groupMembersAndViews.module.css";
import Cookies from "js-cookie";

function YourGroupPage() {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [groupName, setGroupName] = useState("");
  const groupOptionQuery = useQuery({
    queryKey: ["groupOption"],
    queryFn: getGroupOptionLimit4Fn,
  });

  const clubMembershipListQuery = useQuery({
    queryKey: ["clubMembershipList"],
    queryFn: clubMembershipFn,
  });
  const [searchResults, setSearchResults] = useState<
    ClubPostSearchResponse | undefined
  >(undefined);

  useEffect(() => {
    console.log({ searchResults });
  }, [searchResults]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!groupName) {
      return;
    }
    const result = await searchForClubFn({ club_name: groupName });
    setSearchResults(result);
    console.log({ result });
  };

  return (
    <article>
      <SubHeading value="GROUP" />
      <div className={styles.mainContainer}>
        <section className={stylesThree.container}>
          <div>
            <div className={stylesThree.header}>
              <h4>Your Groups</h4>
              <button>See all</button>
            </div>
            <div>
              {clubMembershipListQuery.data?.yourGroups ? (
                clubMembershipListQuery.data?.yourGroups.map((group) => (
                  <div
                    key={group.club_id}
                    className={stylesThree.group}
                  >
                    <img
                      src={group.club_img}
                      alt=""
                    />
                    <Link to={`/group/${group.club_id}`}>
                      {group.club_name.length > 10
                        ? group.club_name.slice(0, 10) + "..."
                        : group.club_name}
                    </Link>
                  </div>
                ))
              ) : (
                <p>Join a group</p>
              )}
            </div>
          </div>
          <div>recent views</div>
        </section>
        <section className={styles.rightHandSection}>
          <div className={styles.searchBarContainer}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="club_name"></label>
              <input
                type="text"
                placeholder="Search group name"
                className={styles.searchInput}
                name="club_name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button>Search</button>
            </form>
            <div>
              {searchResults?.clubPosts && (
                <div>
                  {searchResults.clubPosts.map((club) => (
                    <div key={club.club_id}>
                      <h2>{club.club_name}</h2>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Link to="/create-group">
                + <span className={styles.btnText}>Create new group</span>
              </Link>
            </div>
          </div>
          <div className={stylesOne.groupSuggestionArea}>
            <h4>Suggested for you</h4>
            <div className={stylesOne.groupArea}>
              {groupOptionQuery.data?.clubs.map((option) => (
                <div
                  key={option.club_id}
                  className={stylesOne.card}
                >
                  <img
                    src={option.club_img}
                    alt={option.club_name}
                  />
                  <div>
                    <h5>{option.club_name}</h5>
                    <Link to={`/group/${option.club_id}`}>View</Link>
                  </div>
                  <p></p>
                </div>
              ))}
            </div>
          </div>
          <div className={stylesTwo.yourFeedArea}>
            <h4>Your feed</h4>
            <div>
              <GetGroupPostsByUserId />
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
export default YourGroupPage;
