"use client";

import { useState, useTransition } from "react";
import { triggerNotify } from "./actions";

type Status =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function NotifyButton() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function handleClick() {
    setStatus({ type: "idle" });
    startTransition(async () => {
      const result = await triggerNotify();
      if (result.ok) {
        setStatus({
          type: "success",
          message: `已寄出通知信到 ${result.to}`,
        });
      } else {
        setStatus({
          type: "error",
          message: result.detail
            ? `${result.error}：${result.detail}`
            : result.error,
        });
      }
    });
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:items-start">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {isPending ? "寄送中…" : "寄出通知信"}
      </button>
      {status.type === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">
          {status.message}
        </p>
      )}
      {status.type === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {status.message}
        </p>
      )}
    </div>
  );
}
