export type Photo = {
  src: string;
  width: number;
  height: number;
  srcSet?: { src: string; width: number; height: number }[];
};