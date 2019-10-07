import { AlbumModel } from '../schema/album';

export const createAlbum = (req, res, next) => {
    console.log("req.body", req.body, "user", req.user)
    let { title, genre, releaseDate } = req.body
    //invalid data
    if(!title || !genre ) {
        return res.status(403).json({
            error: true,
            success: false,
            message: "title and genre field cannot be empty"
        })
    }

    let albumInfo = {
       title: title,
       genre: genre,
       releaseDate: releaseDate,
       createdBy: req.payload.id
    }

    AlbumModel.create(albumInfo)
        .then((_album) => {
            if(_album) {
                return res.status(201).json({
                    error: false,
                    success: true,
                    data: _album
                })
            }
        }).catch((error) => {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Unable to create resource" + error.message
            })
        })
}

export const showAllAlbums = async (req, res, next) => {
    try {
        let albums = await AlbumModel.find({ })
        if(albums.length === 0) {
            return res.status(200).json({
                error: false,
                success: true,
                message: "No albums found"
            })
        }
        if(albums && albums.length > 0) {
            return res.status(200).json({
                error: false,
                success: true,
                albums: albums
            })
        }
    } catch (ex) {
        next(ex)
    }
}

export const showAlbumById = async (req, res, next) => {
    try {
        let { id } = req.params;
        console.log("id", id);
        let album = await AlbumModel.findById({ _id: id })
        if(album) {
            return res.status(200).json({
                error: false,
                success: true,
                album: album
            })
        }
    } catch (error) {
        console.log("catch error")
        return res.status(400).json({
            error: true,
            success: false,
            message: error.message
        })
    }
}

export const showAlbumByUser = async (req, res, next) => {
    try {
        let { userId } = req.params;
        let album = await AlbumModel.find({ createdBy: userId });
        if (album) {
            return res.status(200).json({
                error: false,
                success: true,
                album: album
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: true,
            success: false,
            message: error.message
        })
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        let { id } = req.params;
        let deleteAlbum = await AlbumModel.deleteOne({ _id: id })
        console.log("deleted album ", deleteAlbum.deletedCount)
        if(deleteAlbum && deleteAlbum.deletedCount > 1) {
            return res.status(200).json({
                success: true,
                error: false,
                deletedAlbum: deleteAlbum
            })
        } else {
            return res.status(200).json({
                error: false,
                success: true,
                message: "Album with supplied ID does not exist"
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: true,
            success: false,
            message: error.message
        })
    }
}

export const updateAlbum = async (req, res, next) => {
    try {
        let { id } = req.params;
        let filter = { _id: id }
       
        let updateAlbum = await AlbumModel.findOneAndUpdate(filter, req.body, { useFindAndModify: false })
        if (updateAlbum) {
            return res.status(201).json({
                error: false,
                success: true,
                updateAlbum: updateAlbum
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: true,
            success: false,
            message: error.message
        })
    }
}