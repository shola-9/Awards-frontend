export interface StoryByStoryIdResponse {
  stories: Story[];
}

export interface Story {
  story_id: number;
  story: string;
  user_id: number;
}
