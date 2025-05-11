import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/app/config/db";
import User from "@/app/models/user";
// login controller and path setup:
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json(); // ask for email and password from frontend 

    await connectToDB();

    const user = await User.findOne({ email }); // find existing user in db
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 }); // if not found , return 401
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); // use bcrypt to compare passwords
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, username:user.username }, process.env.JWT_SECRET!, {//jwt token with user id and username
      expiresIn: "7d",
    });

    return NextResponse.json({
      token,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
