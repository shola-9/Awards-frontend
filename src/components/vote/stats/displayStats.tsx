import { RankingByAward } from "../../../lib/vote/getRankingByAward";
import styles from "./styles/displayStats.module.css";

export const DisplayVoteStats = (award: RankingByAward) => {
  return (
    <tr
      key={award.candidate}
      className={styles.containerAp2}
    >
      <td>{award.position}</td>
      <td>{award.candidate}</td>
      <td>{award.total_votes}</td>
      <td>{award.percentage_of_total_votes}</td>
    </tr>
  );
};
