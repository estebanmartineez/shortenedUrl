import mongoose, {Document, Model, model, mongo, Schema} from 'mongoose';

export interface IUrl {
    originalUrl : string;
    shortUrl:string;
    title?:string;
    views:number;
}

type UrlModel = Model<IUrl>;
const urlSchema:Schema<IUrl> = new Schema<IUrl>({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true , unique: true},
    title: { type: String, required: false },
    views: Number,
});


const Url = model<IUrl,UrlModel>('Url', urlSchema);

export default Url;