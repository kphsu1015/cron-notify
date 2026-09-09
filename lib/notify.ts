import { resend, NOTIFY_FROM, NOTIFY_TO } from "@/lib/resend";
import { connectToDatabase } from "@/lib/mongoose";
import { CronLogModel } from "@/models/CronLog";
import { buildCongratsEmail } from "@/lib/email-template";

export type SendNotifyResult =
  | { ok: true; id?: string; to: string; triggeredAt: Date }
  | { ok: false; error: string; detail?: string };

// 寄出一封通知信，並記錄一筆 CronLog（寫 log 失敗不影響寄信結果）
export async function sendNotifyEmail(): Promise<SendNotifyResult> {
  const now = new Date();
  const timeText = now.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
  const { subject, text, html } = buildCongratsEmail(timeText);

  const { data, error } = await resend.emails.send({
    from: NOTIFY_FROM,
    to: NOTIFY_TO,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("[notify] 寄信失敗:", error);
    return { ok: false, error: "寄信失敗", detail: error.message };
  }

  try {
    await connectToDatabase();
    await CronLogModel.create({ triggeredAt: now });
  } catch (dbError) {
    console.error("[notify] 寫入 log 失敗:", dbError);
  }

  return { ok: true, id: data?.id, to: NOTIFY_TO, triggeredAt: now };
}
