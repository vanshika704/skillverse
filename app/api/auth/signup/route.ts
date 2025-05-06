import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/config/db";
import User from "@/app/models/user";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
