import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import getCandidatesByAwardFn from "../lib/vote/getCandidatesByAward";
import SubHeading from "../components/app/SubHeading";
import addVoteFn from "../lib/vote/addVote";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "../pages/styles/vote/dynamicVoteAward/dynamicVoteAward.module.css";
import { CandidateResponse } from "../typesAndInterfaces/getCandidatesByAward";
import { LoginSignUp } from "../components/app/loginSignUp";

function DynamicVoteAwardPage() {
  const [res, setRes] = useState<CandidateResponse>();
  const [errMsg, setErrMsg] = useState("");
  const token = Cookies.get("token");
  const [authError, setAuthError] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const { award_id } = useParams();

  useEffect(() => {
    async function server() {
      if (!award_id) throw new Error("award_id is required");
      try {
        const result = await getCandidatesByAwardFn({ award_id, setErrMsg });
        setRes(result);
        setErrMsg("");
      } catch (error) {}
    }
    server();
  }, [token, award_id]);

  const voteMutation = useMutation({
    mutationFn: (candidate: string) => {
      if (!award_id) throw new Error("award_id is required");

      if (!token) {
        setAuthError(true);
        throw new Error("Please login/sign up to vote");
      } else {
        return addVoteFn({ award_id, candidate });
      }
    },
    onSuccess() {
      setJustVoted(true);
    },
  });

  const content = res?.candidates.map((candidate) => (
    <div
      key={candidate.vote_awards_candidates_id}
      className={styles.card}
    >
      {candidate.image ? (
        <img
          src={candidate.image}
          alt={"Photo of " + candidate.vote_awards_candidate_names}
        />
      ) : (
        <img
          src="/placeholder_profile.jpg"
          alt={"Placeholder"}
        />
      )}
      <h4>{candidate.vote_awards_candidate_names}</h4>

      <button
        onClick={() =>
          voteMutation.mutate(candidate.vote_awards_candidate_names)
        }
        className={styles.btn}
      >
        Vote
      </button>
    </div>
  ));

  return (
    <div>
      <SubHeading value="Candidates" />
      <div>
        <p className={styles.description}>
          Click on vote to cast your vote for your preferred candidate but dont
          forget ... you can only vote once.
        </p>
      </div>
      {authError && (
        <div>
          <LoginSignUp />
        </div>
      )}
      <div className={styles.awardCandidates}>
        {errMsg ? (
          <div className={styles.noticeMsg}>
            <p className={styles.errorMsg}>{errMsg}</p>
          </div>
        ) : justVoted ? (
          <div className={styles.noticeMsg}>
            <p className={styles.errorMsg}>Thank you for voting</p>
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
export default DynamicVoteAwardPage;
