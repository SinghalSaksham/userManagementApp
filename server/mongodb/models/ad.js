import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const adSchema = new mongoose.Schema({
  website: { type: String, required: true },
  AdRevenueDollars: { type: Number, required: true },
  AdImpressions: { type: Number, required: true },
  AverageSiteTime: { type: Number, required: true },
  TotalClicks: { type: Number, required: true },
  userId: { type: String, required: true },
});

const adModel = mongoose.model("ad", adSchema);

export default adModel;
