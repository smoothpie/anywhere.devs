import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error getting jobs", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
    let newJob = await prisma.job.create({
      data,
    });
    return NextResponse.json(newJob, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error creating job", { status: 500 });
  }
}