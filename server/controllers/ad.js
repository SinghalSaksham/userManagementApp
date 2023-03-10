import adModel from "../mongodb/models/ad.js";
import * as dotenv from "dotenv";

dotenv.config();

export const getAd = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log("id", id);

    const ads = await adModel.find({ userId: id });

    res.status(200).json(ads);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const ads = await adModel.find();

    res.status(200).json(ads);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAd = async (req, res) => {
  try {
    const {
      website,
      AdRevenueDollars,
      AdImpressions,
      AverageSiteTime,
      TotalClicks,
      userId,
    } = req.body;

    // console.log("website", website);
    // console.log("userId", userId);

    const newAd = await adModel.create({
      website,
      AdRevenueDollars,
      AdImpressions,
      AverageSiteTime,
      TotalClicks,
      userId,
    });

    res.status(200).json(newAd);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
