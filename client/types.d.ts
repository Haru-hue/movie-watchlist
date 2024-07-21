type MovieKeys = "popular" | "top_rated" | "upcoming" | "new";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Cast {
  id: string;
  name?: string;
  profile_path?: string;
  character?: string;
}

interface MovieBackrop {
  id: string;
  name?: string;
  file_path?: string;
}

type SideBarProps = {
  collapseSidebar: boolean;
  navItems?: NavItem[];
  setCollapseSidebar: Dispatch<SetStateAction<boolean>>;
};

interface User {
  email: string;
  name: string;
  username?: string;
  avatarURL: string;
  backgroundURL: string;
  watchlist?: string[]
}

interface ImageObject {
  image?: string;
  preview: string;
}