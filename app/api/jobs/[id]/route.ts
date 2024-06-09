import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      }
    });
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error getting job", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const jobId = params.id;

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
    const editedJob = await prisma.job.update({
      where: { id: jobId },
      data,
    });
    return NextResponse.json(editedJob, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error updating job", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, sessionClaims } = getAuth(req);

    const { publicMetadata }: any = sessionClaims;
    const role = publicMetadata?.role;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (role !== 'admin') {
      return new NextResponse("You're not an admin", { status: 401 });
    }

    const jobId = params.id;

    await prisma.job.delete({ where: { id: jobId } });
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error deleting job", { status: 500 });
  }
}