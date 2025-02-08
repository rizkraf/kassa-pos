import { auth } from "@/server/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    console.log("request", body);
    const { userId, organizationId } = JSON.parse(body) as {
      userId: string;
      organizationId: string;
    };

    await auth.api.addMember({
      body: {
        userId,
        organizationId,
        role: "member",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error adding member:", error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
