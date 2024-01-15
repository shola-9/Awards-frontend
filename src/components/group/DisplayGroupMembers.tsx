import { useQuery } from "@tanstack/react-query";
import getClubMembersFn from "../../lib/club/getClubMembers";
import styles from "./styles/displayGroupMembers.module.css";
import { Link } from "react-router-dom";

function DisplayGroupMembers({ club_id }: { club_id?: string }) {
  const displayGroupMembersQuery = useQuery({
    queryKey: ["displayGroupMembers", club_id],
    queryFn: () => {
      if (!club_id) {
        throw new Error("club_id is required");
      }
      return getClubMembersFn({ club_id });
    },
  });
  if (displayGroupMembersQuery.isLoading) return <p>loading</p>;
  if (displayGroupMembersQuery.isError)
    return <p>No data yet. Check back later</p>;
  return (
    <div className={styles.container}>
      {displayGroupMembersQuery.data?.clubMembers.map((member) => (
        <div
          key={member.user_id}
          className={styles.card}
        >
          <div>
            <p>{member.username}</p>
          </div>
          <div>
            <Link to={`/chat/${member.user_id}`}>Chat</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default DisplayGroupMembers;
