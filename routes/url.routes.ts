import express, {Router} from "express";
import UrlService from "../services/url.service";


const router:Router = express.Router();
const urlService = new UrlService();


router.post("/shorten", urlService.createShortUrl);
router.get("/:shortUrl", urlService.redirectToOriginalUrl);
router.get('/top', urlService.getTopsUrls)

export default router;