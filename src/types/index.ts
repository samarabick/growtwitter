// User logged
export type User = {
  username: string;
  id: string;
  token: string;
  image?: string;
};

export type Profile = {
  username: string;
  id: string;
  image?: string;
};

// User Profile

export type UserProfile = {
  followers: UserProfile[];
  following: UserProfile[];
  id: string;
  imageUrl: string | null;
  name: string;
  username: string;
};

// Tweets
export type Author = {
  id: string;
  name: string;
  imageUrl: string | null;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type Like = {
  author: Author;
  createdAt: string;
  updatedAt: string;
};

export interface Tweet {
  id: string;
  content: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  replies: Tweet[];
  likes: Like[];
}
