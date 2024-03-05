import express, {Router} from "express";
import UrlService from "../services/url.service";


const router:Router = express.Router();
const urlService = new UrlService();


router.post("/shorten", urlService.createShortUrl);
router.get("/top", urlService.getTopsUrls);
router.get("/:shortUrl", urlService.redirectToOriginalUrl);

export default router;