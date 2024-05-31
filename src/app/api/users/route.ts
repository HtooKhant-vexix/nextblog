import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    console.log(db);
    const data = await db.user.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "user doesn't found" }, { status: 500 });
  }
};

// export const CREATE = async ()=>{
//     try {

//     } catch (error) {

//     }
// }
