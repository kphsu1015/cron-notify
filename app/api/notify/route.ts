import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/auth";
import { sendNotifyEmail } from "@/lib/notify";

// 確保每次請求都即時執行，不做靜態快取
export const dynamic = "force-dynamic";

async function handle(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "未授權" }, { status: 401 });
  }

  try {
    const result = await sendNotifyEmail();
    if (!result.ok) {
      return NextResponse.json(result, { status: 502 });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/notify] 未預期錯誤:", err);
    return NextResponse.json(
      { ok: false, error: "未預期錯誤" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
