import getAllAwardsFn from "../../../lib/vote/getAllAwards";
import getRankingByAwardFn from "../../../lib/vote/getRankingByAward";
import { DisplayVoteStats } from "./displayStats";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./styles/displayStatsParent.module.css";

function DisplayStatsParent() {
  const [award_id, setAward_id] = useState(1);

  const getAwardIdQuery = useQuery({
    queryKey: ["getAwardId"],
    queryFn: () => {
      return getAllAwardsFn();
    },
  });

  const getRankingByAwardIdQuery = useQuery({
    queryKey: ["getRankingByAwardId", award_id],
    queryFn: () => {
      return getRankingByAwardFn({ award_id });
    },
  });

  if (getAwardIdQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (getAwardIdQuery.isError) {
    return <p>No data yet. Check back later</p>;
  }

  const rankingTable = getRankingByAwardIdQuery.data?.candidates.map(
    (award) => (
      <DisplayVoteStats
        key={award.candidate}
        {...award}
      />
    )
  );

  const awardOptions = getAwardIdQuery.data?.allAwards.map((award) => (
    <option
      key={award.award_id}
      value={award.award_id}
    >
      {award.award_name}
    </option>
  ));

  return (
    <div className={styles.containerIQ2}>
      <div>
        <h4>Overall voting stats</h4>
      </div>
      <div className={styles.selectContainer}>
        <select
          name="award"
          id="award_id"
          onChange={(e) => setAward_id(Number(e.target.value))}
        >
          {awardOptions}
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Position</th>
              <th>Candidate</th>
              <th>Total Votes</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>{rankingTable}</tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayStatsParent;
