import { NextResponse } from "next/server";

export type ProblemStatus = "accepted" | "wrong" | "error";

// Higher rank wins when a problem has several submissions.
const RANK: Record<ProblemStatus, number> = {
  accepted: 3,
  wrong: 2,
  error: 1,
};

function statusFromVerdict(verdict: string | undefined): ProblemStatus | null {
  if (!verdict) return null;
  if (verdict === "OK") return "accepted";
  if (verdict === "WRONG_ANSWER") return "wrong";
  if (verdict === "TESTING") return null; // still running — ignore
  return "error"; // TLE, RE, MLE, ILE, compile error, etc.
}

type CfSubmission = {
  problem?: { contestId?: number; index?: string };
  verdict?: string;
};

export async function GET(request: Request) {
  const handle = new URL(request.url).searchParams.get("handle")?.trim();

  if (!handle) {
    return NextResponse.json({ error: "A handle is required." }, { status: 400 });
  }

  let cf: { status: string; result?: CfSubmission[]; comment?: string };
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}`,
      { headers: { "User-Agent": "cp-ally-landing" }, cache: "no-store" },
    );
    cf = await res.json();
  } catch {
    return NextResponse.json(
      { error: "Could not reach CodeForces. Try again in a moment." },
      { status: 502 },
    );
  }

  if (cf.status !== "OK" || !cf.result) {
    // CodeForces reports bad input via the "comment" field, e.g.
    // "handle: User with handle X not found" or a length-validation message.
    const comment = (cf.comment ?? "").replace(/^handle:\s*/i, "").trim();
    if (/not found/i.test(comment)) {
      return NextResponse.json(
        { error: `Handle "${handle}" was not found.` },
        { status: 404 },
      );
    }
    if (comment) {
      // Surface CodeForces's own validation message (e.g. length rules).
      return NextResponse.json({ error: comment }, { status: 400 });
    }
    return NextResponse.json({ error: "CodeForces request failed." }, { status: 502 });
  }

  const statusByCode: Record<string, ProblemStatus> = {};
  for (const sub of cf.result) {
    const cid = sub.problem?.contestId;
    const index = sub.problem?.index;
    if (cid == null || !index) continue;
    const status = statusFromVerdict(sub.verdict);
    if (!status) continue;

    const code = `${cid}${index}`;
    const current = statusByCode[code];
    if (!current || RANK[status] > RANK[current]) {
      statusByCode[code] = status;
    }
  }

  return NextResponse.json({ handle, statusByCode });
}
