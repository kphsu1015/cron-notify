import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { CronLogModel } from "@/models/CronLog";
import { isAuthorized } from "@/lib/auth";

// 確保每次請求都即時執行，不做靜態快取
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "未授權" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const now = new Date();
    const log = await CronLogModel.create({ triggeredAt: now });

    return NextResponse.json({
      ok: true,
      id: log._id,
      triggeredAt: log.triggeredAt,
      createdAt: log.createdAt,
    });
  } catch (error) {
    console.error("[/api/cron] 寫入資料庫失敗:", error);
    return NextResponse.json(
      { ok: false, error: "寫入資料庫失敗" },
      { status: 500 }
    );
  }
}
