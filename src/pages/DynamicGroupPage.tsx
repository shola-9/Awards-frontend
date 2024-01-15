import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getClubByIdFn from "../lib/club/getClubById";
import DynamicGroupPageReusable from "./DynamicGroupPageReusable";
import getGroupOptionLimit4Fn from "../lib/club/getClubOptionLimit4";
import getUserInfoFn from "../lib/user/getUserInfo";

function DynamicGroupPage() {
  const { club_id } = useParams();

  const groupQuery = useQuery({
    queryKey: ["group", club_id],
    queryFn: () => {
      if (!club_id) {
        throw new Error("club_id is required");
      }
      return getClubByIdFn({ club_id });
    },
  });

  const groupOptionQuery = useQuery({
    queryKey: ["groupOption"],
    queryFn: getGroupOptionLimit4Fn,
  });

  const profileInfoQuery = useQuery({
    queryKey: ["profileInfo"],
    queryFn: getUserInfoFn,
  });

  if (groupQuery.isLoading) return <p>loading...</p>;
  if (groupQuery.isError) return <p>No data yet. Check back later</p>;
  if (!groupQuery.data) return <p>no data</p>;

  if (groupOptionQuery.isLoading) return <p>loading...</p>;
  if (groupOptionQuery.isError) return <p>No data yet. Check back later</p>;
  if (!groupOptionQuery.data) return <p>no data</p>;

  if ("club" in groupQuery.data) {
    // Render content for SpecificClubArrRes
    const { club } = groupQuery.data;
    const clubOptions = groupOptionQuery.data?.clubs;
    const profile = profileInfoQuery.data?.user.user_img;

    return (
      <DynamicGroupPageReusable
        club_id={club_id}
        club={club}
        clubOptions={clubOptions}
        profile={profile}
      />
    );
  } else {
    // Render content for AlternativeClubsRes
    const { message } = groupQuery.data;
    const { clubs } = groupQuery.data;
    return (
      <>
        <p>{message}</p>
        <p>{clubs.map((club) => club.club_name)}</p>
      </>
    );
  }
}
export default DynamicGroupPage;
