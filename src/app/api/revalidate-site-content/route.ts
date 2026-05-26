import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidateTag("site-content", "default");
  return NextResponse.json({ ok: true });
}
