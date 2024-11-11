import {
  deleteWatchLater,
  insertWatchLater,
  watchLaterExists,
} from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET = auth(
  //@ts-ignore
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    //@ts-ignore
    if (!req.auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const {
      user: { email }, //@ts-ignore
    } = req.auth;

    const exists = await watchLaterExists(id, email);
    if (exists) {
      return NextResponse.json({ message: "Already added to Watch Later" });
    }

    try {
      await insertWatchLater(id, email);
      return NextResponse.json({ message: "Watch Later Added" });
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json(
        { error: "Failed to add Watch Later" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = auth(
  //@ts-ignore
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const {
      user: { email }, //@ts-ignore
    } = req.auth;

    try {
      await deleteWatchLater(id, email);
      return NextResponse.json({ message: "Watch Later removed" });
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json(
        { error: "Failed to remove Watch Later" },
        { status: 500 }
      );
    }
  }
);
