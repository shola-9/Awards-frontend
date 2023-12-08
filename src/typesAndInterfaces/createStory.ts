export interface CreateStory {
  detail?: string;
  story: FileList | string;
  [key: string]: string | number | FileList | undefined;
}
