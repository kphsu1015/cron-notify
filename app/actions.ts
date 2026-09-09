"use server";

import { sendNotifyEmail, type SendNotifyResult } from "@/lib/notify";

// 首頁按鈕用的 server action：直接在伺服器端寄信，不需要 secret
export async function triggerNotify(): Promise<SendNotifyResult> {
  try {
    return await sendNotifyEmail();
  } catch (err) {
    console.error("[triggerNotify] 未預期錯誤:", err);
    return { ok: false, error: "未預期錯誤" };
  }
}
