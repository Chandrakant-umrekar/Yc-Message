import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = user.verifyCodeExpiry > new Date();

    if (isCodeValid && isCodeExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please signup again to get nwe code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log("Error sending verifying user", err);
    return Response.json(
      { success: false, message: "Failed to verify user" },
      { status: 500 }
    );
  }
}
