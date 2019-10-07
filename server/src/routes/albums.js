import { Router } from 'express';
import { createAlbum,
         showAllAlbums,
        showAlbumById,
        showAlbumByUser,
        updateAlbum,
        deleteAlbum } from '../controller/album';
import auth from '../authorization/index';

const albumRouter = new Router();

albumRouter.post('/createAlbum', auth.required, createAlbum);
albumRouter.get('/showAllAlbums', auth.required, showAllAlbums);
albumRouter.get('/showAlbumById/:id', auth.required, showAlbumById);
albumRouter.get('/showAlbumByUser/:userId', auth.required, showAlbumByUser);
albumRouter.put('/updateAlbum/:id', auth.required, updateAlbum);
albumRouter.delete('/deleteAlbum/:id', auth.required, deleteAlbum);

export default albumRouter;