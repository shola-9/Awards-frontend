export interface AncestriesPostCommentsResponse {
  ancestries_post_comments: AncestriesPostComment[];
}

export interface AncestriesPostComment {
  comment_id: number;
  post_id: number;
  user_id: number;
  comment: string;
  username: string;
  user_img: null | string;
}
