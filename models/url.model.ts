import mongoose, { Schema } from 'mongoose';

interface IUrl {
    originalUrl : string;
    shortUrl:string;
    title?:string;
    views:number;
}


const urlSchema = new Schema<IUrl>({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true , unique: true},
    title: { type: String, required: false },
    views: Number,
});


const Url = mongoose.model('Url', urlSchema);

export default Url;