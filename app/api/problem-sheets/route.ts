import { NextResponse } from "next/server";
import { SITE_URL } from "../../_components/site";
import { sheetsForProblemCode } from "../../_data/sheets";

// GET /api/problem-sheets?code=4A
// Returns the sheets that contain the given problem, each with its name and URL.
export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim();

  if (!code) {
    return NextResponse.json(
      { error: "A problem code is required, e.g. ?code=4A" },
      { status: 400 },
    );
  }

  const sheets = sheetsForProblemCode(code).map((s) => ({
    name: s.title,
    url: `${SITE_URL}/sheets/${s.slug}`,
  }));

  return NextResponse.json({
    code: code.toUpperCase(),
    count: sheets.length,
    sheets,
  });
}
