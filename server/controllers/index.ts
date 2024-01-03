import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";

export const addUser = async (args: any, context: any) => {
  const { name, email, password, username } = args;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await context.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      user: newUser,
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

export const updateUser = async (args: any, context: any) => {
  const { id, name, email, password, username, watchlist } = args;

  try {
    const existingUser = await context.prisma.user.findFirst({
        where: {
          id: parseInt(id),
        },
      });

    if (!Boolean(existingUser)) {
        throw new GraphQLError("User does not exist")
    }

    const updatedUser = await context.prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        password,
        username,
        watchlist: {
            set: [...existingUser.watchlist, ...watchlist]
        }
      },
    });
    return {
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    };
  } catch (err) {
    throw new GraphQLError("An error occured", {
      extensions: {
        message: "Updating process failed",
        success: false,
      },
    });
  }
};

export const deleteUser = async (args: any, context: any) => {
  const { id } = args;

  const existingUser = await context.prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  try {
    await context.prisma.user.delete({
      where: { id: parseInt(id) },
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

export const findUser = async (args: any, context: any) => {
    const { email, password } = args;
  
    const existingUser = await context.prisma.user.findUnique({ 
      where: { email },
    });
  
    if (!existingUser) {
      throw new GraphQLError("There is no e-mail associated with that account");
    }
  
    const isValidPassword = bcrypt.compareSync(password, existingUser.password);
  
    if (!isValidPassword) {
      throw new GraphQLError('Invalid password');
    }
  
    return {
      success: true,
      message: 'Login successful',
      user: existingUser,
    };
  };
  