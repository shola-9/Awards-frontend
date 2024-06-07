import Cookies from "js-cookie";
import { CandidateResponse } from "../../typesAndInterfaces/getCandidatesByAward";

async function getCandidatesByAwardFn({
  award_id,
  setErrMsg,
}: {
  award_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<CandidateResponse> {
  const url = `https://e-awards.ooshinfo.com/api/v1/vote/getAwardCandidates?award_id=${award_id}`;

  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // 404 and the likes gotten here
  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).message;
    console.log(errorMsg); // "User has already voted for this award"

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    throw new Error("Request failed");
  }

  // get good res at this stage
  const data: CandidateResponse = await res.json();

  return data;
}
export default getCandidatesByAwardFn;
