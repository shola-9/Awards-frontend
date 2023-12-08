export interface ClubPostResponse {
  clubPosts: ClubPost[];
}

export interface ClubPost {
  club_post_id: number;
  club_post_content: string;
  user_id: number;
  username: string;
  user_img: string | null;
  club_id: number;
  club_post_created_at: string;
  club_post_likes: number;
  club_post_views: number;
  club_post_tag: string;
  image_urls: string;
  club_post_comments: null | string;
  club_name: string;
  club_img: string;
}

export interface ClubPost404Response {
  message: string;
}
