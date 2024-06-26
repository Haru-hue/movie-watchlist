import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import processArgs from "../utils/processArgs";
import jwt from "jsonwebtoken";

export const addUser = async (args: Args, context: Context) => {
  const { name, email, password } = args;
  const hashedPassword = await bcrypt.hash(password as string, 10);
  
  const token = jwt.sign(
    { name, email },
    'secret',
    { expiresIn: "24h" }
  );

  try {
    await context.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      token,
    };
  } catch (err) {
    throw new GraphQLError("An error occured", {
      extensions: {
        message: "This user already exists",
        success: false,
      },
    });
  }
};

export const updateUser = async (args: Args, context: Context) => {
  const { email } = args;

  try {
    const existingUser = await context.prisma.user.findUnique({
      where: { email },
    });

    if (!Boolean(existingUser)) {
      throw new GraphQLError("User does not exist");
    }

    const data = await processArgs(args, existingUser, context)

    const updatedUser = await context.prisma.user.update({
      where: { email },
      data
    });

    return {
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    };
  } catch (err) {
    console.error(err);
    throw new GraphQLError("An error occured", {
      extensions: {
        message: "Updating process failed",
        success: false,
      },
    });
  }
};

export const deleteUser = async (args: Args, context: Context) => {
  const { email } = args;

  const existingUser = await context.prisma.user.findUnique({
    where: { email },
  });

  try {
    await context.prisma.user.delete({
      where: { email },
    });

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    throw new GraphQLError("An error occurred", {
      extensions: {
        message: !Boolean(existingUser)
          ? "User does not exist"
          : "User cannot be deleted",
        success: false,
      },
    });
  }
};

export const findUser = async (args: Args, context: Context) => {
  const { email, password } = args;

  const existingUser = await context.prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new GraphQLError("There is no e-mail associated with that account");
  }

  const isValidPassword = bcrypt.compareSync(password as string, existingUser.password);
  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    'secret',
    { expiresIn: "24h" }
  );
  if (!isValidPassword) {
    throw new GraphQLError("Invalid password");
  }

  return {
    success: true,
    message: "Login successful",
    user: existingUser,
    token
  };
};

export const googleFindUser = async (args: Args, context: Context) => {
  const { email } = args;

  const existingUser = await context.prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new GraphQLError("There is no e-mail associated with that account");
  }

  return {
    message: 'Login successful',
    success: true,
    user: existingUser
  }
};