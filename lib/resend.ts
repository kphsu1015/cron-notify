import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error("請在環境變數中設定 RESEND_API_KEY");
}

export const resend = new Resend(RESEND_API_KEY);

// 寄件人 / 收件人（寫死）
export const NOTIFY_FROM = "onboarding@resend.dev";
export const NOTIFY_TO = "zoae1015@gmail.com";
