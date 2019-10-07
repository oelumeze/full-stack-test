import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: false
    },
    createdBy: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
     }
})

export const AlbumModel = new mongoose.model('albumModel', AlbumSchema);