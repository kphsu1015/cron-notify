import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { CronLogModel } from "@/models/CronLog";

// 確保每次請求都即時執行，不做靜態快取
export const dynamic = "force-dynamic";

export async function GET() {
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
