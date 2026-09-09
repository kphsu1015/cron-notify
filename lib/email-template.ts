// 恭喜完課通知信的內容（純文字 + HTML 兩種版本）

export function buildCongratsEmail(timeText: string): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = "🎉 恭喜你！所有積木即將學完";

  const text = [
    "恭喜你！",
    "",
    "你已經快學完課程裡所有的積木了，這是非常了不起的成果。",
    "從第一個 Hello World 到現在能自己串接 API、寄信、排程，",
    "你已經具備把想法變成產品的能力。",
    "",
    "剩下最後一哩路，繼續加油，完課就在眼前！",
    "",
    `寄送時間：${timeText}`,
    "— cron-notify",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans TC',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <tr>
              <td style="background-color:#18181b;padding:32px 40px;text-align:center;">
                <div style="font-size:40px;line-height:1;">🎉</div>
                <h1 style="margin:16px 0 0;color:#ffffff;font-size:22px;font-weight:600;">恭喜你！</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px;color:#27272a;font-size:15px;line-height:1.7;">
                <p style="margin:0 0 16px;">
                  你已經<strong>快學完課程裡所有的積木</strong>了，這是非常了不起的成果。
                </p>
                <p style="margin:0 0 16px;">
                  從第一個 Hello World 到現在能自己串接 API、寄信、排程，
                  你已經具備把想法變成產品的能力。
                </p>
                <p style="margin:0 0 24px;">
                  剩下最後一哩路，繼續加油，<strong>完課就在眼前</strong>！
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color:#18181b;border-radius:9999px;">
                      <a href="http://localhost:3000" style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">
                        回到專案
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;border-top:1px solid #e4e4e7;color:#a1a1aa;font-size:12px;line-height:1.6;">
                寄送時間：${timeText}<br />
                此信由 cron-notify 自動寄出
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
