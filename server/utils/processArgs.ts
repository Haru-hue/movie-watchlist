import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import imageUpload from "./imageUpload";

export const processArgs = async (
  args: Args,
  existingUser: User,
  context: Context
) => {
  const data: Args = {};

  for (const key in args) {
    if (args[key] !== undefined) {
      switch (key) {
        case "password":
          const isValidPassword = bcrypt.compareSync(
            args[key] as string,
            existingUser.password
          );
          if (isValidPassword) {
            throw new GraphQLError(
              "New password cannot be the same as the current one"
            );
          }
          data[key] = args[key];
          break;
        case "username":
          const usernameExists = await context.prisma.user.findFirst({
            where: { [key]: args[key] },
          });
          if (usernameExists) {
            throw new GraphQLError("Username already exists");
          }
          data[key] = args[key];
          break;
         case "avatarURL":
         case "backgroundURL":
            if (args[key] !== undefined) {
              const imageURL = await imageUpload(args[key] as string)
              data[key] = imageURL;
            }
          break;
        default:
          data[key] = args[key];
      }
    }
  }

  return data;
};

export default processArgs;
