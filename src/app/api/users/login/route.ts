import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt, { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const have = await db.user.findFirst({
      where: { email: body.email },
    });
    if (!have || !bcrypt.compareSync(body.password, have.password))
      return NextResponse.json(
        { message: "Credential Wrong" },
        { status: 500 }
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
      { message: "could not login user" },
      { status: 500 }
    );
  }
}
