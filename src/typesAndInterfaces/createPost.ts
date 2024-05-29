export interface CreatePost {
  name: string;
  sub_heading: string;
  year: string;
  picture: FileList | string;
  tag: "winners";
  [key: string]: string | number | FileList | undefined;
}
