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

interface MovieBox {
  id: number;
  image: string;
  rating: number;
  title: string;
  overview: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: Object;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage?: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries?: any[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieData {
  data?: MovieDetails;
  credits?: MovieCredits;
  gallery?: MovieGallery;
  recommendations?: Movie[];
  video?: any
}

interface MovieCredits {
  id: number;
  cast: [
    {
      id: number;
      name: string;
      profile_path: string;
      cast_id: number;
      character: string;
    }
  ];
  crew: [
    {
      id: number;
      name: string;
      profile_path: string;
      department: Crew;
      job: string;
      known_for_department: string;
    }
  ];
}

interface MovieGallery {
  id: number;
  backdrops?: [
    {
      file_path: string;
    }
  ];
  posters?: [
    {
      file_path: string;
    }
  ];
}

type Crew = "Directing" | "Production" | "Crew";

interface userInfo {
  username: string;
  email: string;
  avatar_url: string;
}

interface UserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface EmailParams {
  to_name: string;
  to_email: string;
  message: string;
  [key: string]: string;
}

interface FileWithImage extends File {
  image?: string;
}

interface LayoutProps {
  children: React.ReactNode
}

type NavItem = {
  label: string
  link: string
  icon: React.ReactNode
}

interface UserProfile {
  name: string
  username: string
  avatarURL: string
  backgroundURL: string
}