import {Request, Response} from "express";
import shortid from 'shortid'
import Url from "../models/url.model"

class UrlService {
     public async createShortUrl( req: Request, res: Response) {
        const {originalUrl} = req.body;
        const shortUrl = shortid.generate()
        try {
            // create the shortUrl
            const existingUrl = await Url.findOne({ originalUrl });
            if(existingUrl) {
                throw new Error('Url Already processed')
            } else {
                const newUrl = await Url.create({originalUrl, shortUrl});
                res.json(newUrl);
            }
        } catch (error) {
           throw new Error(`error creating url : ${error}`)
        }
    }


    public async redirectToOriginalUrl( req: Request, res: Response) {
        const {shortUrl} = req.params;

        try {
            // search url by shortUrl
            const url = await Url.findOneAndUpdate({ shortUrl},{$inc:{views:1} },{upsert:false});
            if(url && 'originalUrl' in url) {
                res.redirect(url.originalUrl)
            } else {
                res.status(404).json('url not found')
            }
        } catch (e) {
            console.error("error creating url", e)
        }
    }

    public async  getTopsUrls( req: Request, res: Response) {
        try {
            const topUrls =  await Url.find().sort({views:-1}).limit(100);
           // const arrShortsUrls = topUrls.map(({shortUrl}) => shortUrl)

            if (!topUrls) {
                res.status(404).json({ error: 'No top URLs found' });
                return;
            }

            res.json(topUrls);
        } catch (e) {
            console.error('Error getting top URLs:', e);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


export default UrlService