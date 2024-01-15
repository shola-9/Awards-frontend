import { useQuery } from "@tanstack/react-query";
import getAllAwardsFn from "../../../lib/vote/getAllAwards";
import { Link } from "react-router-dom";
import styles from "./styles/awardC.module.css";

export const GetAll = () => {
  const getAllAwards = useQuery({
    queryKey: ["getAllAwards"],
    queryFn: getAllAwardsFn,
  });

  if (getAllAwards.isLoading) {
    return <div>Loading</div>;
  }

  if (getAllAwards.isError) {
    return <p>No data yet. Check back later</p>;
  }

  const content = getAllAwards.data?.allAwards.map((award) => (
    <Link
      to={`/award/${award.award_id}`}
      key={award.award_id}
      className={styles.card}
    >
      {award.award_name}
    </Link>
  ));
  return <div className={styles.awardCContainer}>{content}</div>;
};
