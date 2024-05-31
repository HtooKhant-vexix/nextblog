import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt, { hash } from "bcryptjs";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const have = await db.user.findFirst({
      where: { email: body.email },
    });
    if (have)
      return NextResponse.json(
        { message: "email already exit " },
        { status: 200 }
      );
    const salt = bcrypt.genSaltSync(10);
    const hashPswd = bcrypt.hashSync(body.password, salt);
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPswd,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "could not create user" },
      { status: 500 }
    );
  }
}
