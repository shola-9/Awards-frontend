export interface Response {
  reels: Reel[];
}

export interface Reel {
  short_videos_id: number;
  video: string;
  detail: string;
  likes: number | null;
  views: number;
  created_at: Date;
  username: string;
  years_ago: number;
  months_ago: number;
  days_ago: number;
  hours_ago: number;
  minutes_ago: number;
  seconds_ago: number;
  comment_ids: null | string;
  comments: null | string;
  comment_user_ids: null | string;
}
