import { NextResponse } from "next/server";
import manifest from "@/data/photo-manifest.json";

export async function GET() {
  return NextResponse.json(manifest.home ?? []);
}