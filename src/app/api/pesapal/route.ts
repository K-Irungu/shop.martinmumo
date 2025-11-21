import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("Pesapal get request hit");
  } catch (error) {
    console.log("Error at pesapal get request endpoint");
  }
}
