import {Request, Response} from "express";
import shortid from 'shortid'
import Url from "../models/url.model"

class UrlService {
     public async createShortUrl( req: Request, res: Response) {
        const {originalUrl} = req.body;
        const shortUrl = shortid.generate()
        try {
            // create the shortUrl
            const newUrl = await Url.create({originalUrl, shortUrl});
            res.json(newUrl)
        } catch (e) {
            console.error("error creating url", e)
        }
    }


    public async redirectToOriginalUrl( req: Request, res: Response) {
        const {shortUrl} = req.params;

        try {
            // search url by shortUrl
            const url  = await Url.findOneAndUpdate<typeof Url>({ shortUrl},{$inc:{views:1} });
            if(url) {
                res.redirect(url.originalUrl)
            } else {
                res.status(404).json('url not found')
            }
        } catch (e) {
            console.error("error creating url", e)
        }
    }

    public async getTopsUrls( req: Request, res: Response) {
        try {
            const topUrls =  await Url.find().sort({views:-1}).limit(100);
           // const arrShortsUrls = topUrls.map(({shortUrl}) => shortUrl)
            res.json(topUrls);
        } catch (e) {
            console.error("error creating url", e)
        }
    }
}


export default UrlService