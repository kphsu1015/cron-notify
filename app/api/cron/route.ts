import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { CronLogModel } from "@/models/CronLog";

// 確保每次請求都即時執行，不做靜態快取
export const dynamic = "force-dynamic";

// 驗證請求是否帶著正確的 secret
// 支援兩種 header：
//   Authorization: Bearer <secret>
//   x-cron-secret: <secret>
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("[/api/cron] 未設定 CRON_SECRET 環境變數");
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) {
    return true;
  }

  const cronSecretHeader = request.headers.get("x-cron-secret");
  if (cronSecretHeader === secret) {
    return true;
  }

  return false;
}

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
