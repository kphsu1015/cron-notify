import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const cronLogSchema = new Schema(
  {
    // 這次呼叫 API 的時間
    triggeredAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  {
    // 自動加上 createdAt / updatedAt
    timestamps: true,
  }
);

export type CronLog = InferSchemaType<typeof cronLogSchema>;

// 避免熱重載時重複註冊 model
export const CronLogModel: Model<CronLog> =
  (mongoose.models.CronLog as Model<CronLog>) ||
  mongoose.model<CronLog>("CronLog", cronLogSchema);
