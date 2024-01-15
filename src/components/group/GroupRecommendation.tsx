import getGroupOptionLimit4Fn from "../../lib/club/getClubOptionLimit4";
import { useQuery } from "@tanstack/react-query";
import styles from "./styles/groupRecommendation.module.css";
import { Link } from "react-router-dom";

function GroupRecommendation() {
  const groupOptionQuery = useQuery({
    queryKey: ["groupOption"],
    queryFn: getGroupOptionLimit4Fn,
  });

  if (groupOptionQuery.isLoading) return <p>loading...</p>;
  if (groupOptionQuery.isError) return <p>No data yet. Check back later</p>;
  if (!groupOptionQuery.data) return <p>no data</p>;
  return (
    <div className={styles.container}>
      {groupOptionQuery.data.clubs.map((club) => (
        <div
          className={styles.card}
          key={club.club_id}
        >
          <img
            src={club.club_img}
            alt={club.club_name}
          />
          <h5>{club.club_name}</h5>
          <div className={styles.info}>
            <p>
              {club.members_count === 1
                ? `${club.members_count} member`
                : `${club.members_count} members`}
            </p>
            <p>
              {club.posts_last_24h_count === 1
                ? `${club.posts_last_24h_count} post today`
                : `${club.posts_last_24h_count} posts today`}
            </p>
          </div>
          <Link to={`/group/${club.club_id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}
export default GroupRecommendation;
