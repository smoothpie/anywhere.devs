import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id;
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      }
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error getting course", { status: 500 });
  }
}

export async function PATCH(req, { params }: { params: { id: string } }) {
  const data = await req.json();
  const courseId = params.id;

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
    const editedCourse = await prisma.course.update({
      where: { id: courseId },
      data,
    });
    return NextResponse.json(editedCourse, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error updating course", { status: 500 });
  }
}

export async function DELETE(req, { params }: { params: { id: string } }) {
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

    const courseId = params.id;

    const deletedCourse = await prisma.course.delete({ where: { id: courseId } });
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error deleting course", { status: 500 });
  }
}