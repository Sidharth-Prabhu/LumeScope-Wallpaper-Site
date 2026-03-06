export interface Wallpaper {
  filename: string;
  url: string;
  tags: string[];
  category: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
