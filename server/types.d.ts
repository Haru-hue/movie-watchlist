interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

type Args = {
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  watchlist?: string[];
  verificationCode?: number
  avatarURL?: String
  backgroundURL?: String
  [key: string]: any;
};

type User = {
  name?: string;
  email: string;
  password: string;
  verificationCode?: number;
  watchlist: string[];
  avatarURL: String
  backgroundURL: String
  [key: string]: string;
};

