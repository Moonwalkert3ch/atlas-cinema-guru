import {
  deleteWatchLater,
  insertWatchLater,
  watchLaterExists,
} from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// handle POST /api/watch-later
export const POST = auth(
  //@ts-ignore
  async (req: NextRequest, context: { params: { id: string } }) => {
    const { id } = await context.params;

    if (!req.auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const { user: { email } } = req.auth;
    const exists = await watchLaterExists(id, email);

    if (exists) {
      return NextResponse.json({ message: "Already added to Watch Later" });
    }

    await insertWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later Added" });
  }
);

export const GET = auth(
  //@ts-ignore
  async (req: NextRequest, context: { params: { id: string } }) => {
    const { id } = await context.params;

    if (!req.auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const { user: { email } } = req.auth;
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
  async (req: NextRequest, context: { params: { id: string } }) => {
    const { id } = await context.params;

    const { user: { email } } = req.auth;

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
