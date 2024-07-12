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
  avatarURL?: String
  [key: string]: any;
};

type User = {
  name?: string;
  email: string;
  password: string;
  watchlist: string[];
  avatarURL: String
  [key: string]: string;
};

