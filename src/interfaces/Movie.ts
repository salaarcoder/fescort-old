interface IMovie {
  videoId: string;
  title: string;
  slug: string;
  url: string;
  imageUrl: string;
  actors: string[];
  categories: string[];
  channel: string;
  rank: number;
  tags: string[];
  status: string;
  createdAt: number;
  updatedAt: number;
}

interface ICreateMovieFormData {
  title: string;
  slug: string;
  url: string;
  imageUrl: string;
  actors: string[];
  categories: string[];
  channel: string;
  rank: number;
  tags: string[];
  status: string;
}

export type {
  IMovie,
  ICreateMovieFormData
}