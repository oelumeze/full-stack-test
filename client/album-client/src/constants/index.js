import Album from '../components/albums/Album';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import AlbumForm from '../components/album-forms/AlbumForm';
import EditAlbum from '../components/edit-album/EditAlbum';
import AlbumDetails from '../components/album-details/AlbumDetails';
import Logout from '../components/logout/Logout';

const currentUser = [
    { title: "Users", url: "/users" },
    { title: "Albums", url: "/albums" },
    { title: "Logout", url: "/logout"}
];

const guestUser = [
    { title: "Login", url: "/login" },
    { title: "Register", url: "/register" }
];

export const navLinks = () => {
    return {
        currentUser: currentUser,
        guestUser: guestUser
    }
};


export const routes = [
    {
        component: Album,
        routeUrl: '/'
    },
    {
        component: Album,
        routeUrl: '/albums'
    },
    {
        component: Login,
        routeUrl: '/login'
    },
    {
        component: Register,
        routeUrl: '/register'
    },
    {
        component: AlbumForm,
        routeUrl: '/createAlbum'
    }, 
    {
        component: EditAlbum,
        routeUrl: '/editAlbum/:albumId'
    },
    {
        component: AlbumDetails,
        routeUrl: '/albumDetails/:albumId'
    },
    {
        component: Logout,
        routeUrl: '/logout'
    }
];

