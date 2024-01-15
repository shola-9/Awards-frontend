export interface CandidateResponse {
  candidates: Candidate[];
}

export interface Candidate {
  vote_awards_candidates_id: number;
  vote_awards_candidate_names: string;
  image: null | string;
  award_id: number;
}
