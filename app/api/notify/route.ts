import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/auth";
import { resend, NOTIFY_FROM, NOTIFY_TO } from "@/lib/resend";
import { connectToDatabase } from "@/lib/mongoose";
import { CronLogModel } from "@/models/CronLog";

// 確保每次請求都即時執行，不做靜態快取
export const dynamic = "force-dynamic";

async function handle(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "未授權" }, { status: 401 });
  }

  const now = new Date();
  const timeText = now.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });

  try {
    // 寄出通知信
    const { data, error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject: `Cron 通知 - ${timeText}`,
      text: `這是一封來自 cron-notify 的通知信。\n\n觸發時間：${timeText}`,
    });

    if (error) {
      console.error("[/api/notify] 寄信失敗:", error);
      return NextResponse.json(
        { ok: false, error: "寄信失敗", detail: error.message },
        { status: 502 }
      );
    }

    // 記錄一筆 log（失敗不影響寄信結果）
    try {
      await connectToDatabase();
      await CronLogModel.create({ triggeredAt: now });
    } catch (dbError) {
      console.error("[/api/notify] 寫入 log 失敗:", dbError);
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
      to: NOTIFY_TO,
      triggeredAt: now,
    });
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
