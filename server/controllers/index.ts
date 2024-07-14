import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import processArgs from "../utils/processArgs";
import jwt from "jsonwebtoken";

export const addUser = async (args: Args, context: Context) => {
  const { name, email, password, username } = args;
  const hashedPassword = await bcrypt.hash(password as string, 10);
  
  const token = jwt.sign(
    { name, email },
    'secret',
    { expiresIn: "24h" }
  );

  try {
   const newUser = await context.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username
      },
    });

    return {
      message: "User created successfully",
      success: true,
      user: newUser,
      token,
    };
  } catch (err) {
    throw new GraphQLError("This user already exists", {
      extensions: {
        code: "BAD_REQUEST",
        http: { status: 400 },
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
      throw new GraphQLError("User does not exist", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } }
      });
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
    throw new GraphQLError("There is no e-mail associated with this account", {
      extensions: { code: "NOT_FOUND", http: { status: 404 } }
    });
  }

  const isValidPassword = bcrypt.compareSync(password as string, existingUser.password);
  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    'secret',
    { expiresIn: "24h" }
  );
  if (!isValidPassword) {
    throw new GraphQLError("Invalid password", {
      extensions: { code: "BAD_REQUEST", http: { status: 400 } }
    });
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
    throw new GraphQLError("There is no e-mail associated with that account", {
      extensions: { code: "NOT_FOUND", http: { status: 404 } }
    });
  }

  const token = jwt.sign(
    { email },
    'secret',
    { expiresIn: "24h" }
  );

  return {
    message: 'Login successful',
    success: true,
    user: existingUser,
    token
  }
};