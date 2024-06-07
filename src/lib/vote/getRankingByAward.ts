export interface RankingByAwardResponse {
  candidates: RankingByAward[];
}

export interface RankingByAward {
  position: number;
  candidate: string;
  total_votes: number;
  percentage_of_total_votes: number;
}

async function getRankingByAwardFn({
  award_id,
}: {
  award_id: number;
}): Promise<RankingByAwardResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/vote/getRankingByAward?award_id=${award_id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 404 and the likes gotten here
  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).message;
    console.log(errorMsg); // "User has already voted for this award"

    // Throw an error to stop further execution
    throw new Error("Request failed");
  }

  // get good res at this stage
  const data: RankingByAwardResponse = await res.json();

  return data;
}
export default getRankingByAwardFn;
