export interface AncestriesPostResponse {
  ancestries_posts: AncestriesPost[];
}

export interface AncestriesPost {
  ancestries_postid: number;
  post_heading: string;
  post_sub_heading: string;
  age: number;
  sex: number;
  email: string;
  address: string;
  state: string;
  nationality: string;
  date_year: number;
  content: string;
  img_urls: string;
}
