import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error("請在環境變數中設定 RESEND_API_KEY");
}

export const resend = new Resend(RESEND_API_KEY);

// 預設寄件人 / 收件人（可用環境變數覆蓋）
export const NOTIFY_FROM = process.env.NOTIFY_FROM ?? "onboarding@resend.dev";
export const NOTIFY_TO = process.env.NOTIFY_TO ?? "zoae1015@gmail.com";
