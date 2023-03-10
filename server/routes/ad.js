import express from "express";

import { getAd, getAllAds, createAd } from "../controllers/ad.js";

const router = express.Router();

router.get("/:id", getAd);
router.get("/", getAllAds);
router.post("/", createAd);

export default router;
