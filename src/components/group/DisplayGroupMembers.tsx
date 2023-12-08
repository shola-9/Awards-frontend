import { useQuery } from "@tanstack/react-query";
import getClubMembersFn from "../../lib/club/getClubMembers";
import styles from "./styles/displayGroupMembers.module.css";

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
  if (displayGroupMembersQuery.isError) return <p>error</p>;
  return (
    <div>
      {displayGroupMembersQuery.data?.clubMembers.map((member) => (
        <div key={member.user_id} className={styles.container}>
          <p>{member.username}</p>
        </div>
      ))}
    </div>
  );
}
export default DisplayGroupMembers;
