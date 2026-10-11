import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const clerk = clerkMiddleware();
export default function proxy(request, event) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) return NextResponse.next();
  return clerk(request, event);
}
export const config = { matcher: ["/admin(.*)", "/api/admin(.*)", "/api/media(.*)"] };
