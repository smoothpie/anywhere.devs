import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error getting courses", { status: 500 });
  }
}

export async function POST(req) {
  const data = await req.json();
  const { userId, sessionClaims } = getAuth(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { publicMetadata }: any = sessionClaims;
  const role = publicMetadata?.role;

  try {
    if (role !== 'admin') {
      return new NextResponse("You're not an admin", { status: 401 });
    }
    let newCourse = await prisma.course.create({
      data,
    });
    return NextResponse.json(newCourse, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error creating course", { status: 500 });
  }
}