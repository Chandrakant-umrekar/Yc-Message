import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessages: acceptMessages,
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: "Failed to update user" },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Message acceptance updated successfully",
          updatedUser,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log("Failed to update user to accept messages:", err);
    return Response.json(
      { success: false, message: "Failed to update user to accept messages" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, isAcceptingMessages: foundUser.isAcceptingMessages },
      { status: 200 }
    );
  } catch (err) {
    console.log("Failed to get user to accept messages:", err);
    return Response.json(
      { success: false, message: "Failed to get user to accept messages" },
      { status: 500 }
    );
  }
}
