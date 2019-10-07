import React from 'react';
import { getAllAlbums, deleteAlbum } from '../../services/albumServices';
import AlbumCards from './AlbumCards';
import { Redirect } from 'react-router-dom';

class Album extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            albums: []
        };
        this.removeAlbum = this.removeAlbum.bind(this);
        this.renderCreateButton = this.renderCreateButton.bind(this);
        this.goToCreateAlbum = this.goToCreateAlbum.bind(this);
        this.editAlbum = this.editAlbum.bind(this);
        this.showAlbumDetails = this.showAlbumDetails.bind(this);
    }

    componentDidMount() {
        console.log("did mount")
        if (localStorage.getItem("album_access_token")) {
            getAllAlbums(localStorage.getItem("album_access_token")).then((_albums) => {
                if(_albums.data.success === true) {
                    this.setState({
                        albums: _albums.data["albums"]
                    })
                }
            }).catch((_error) => {
                alert("An unexpected error occured")
            })
         } 
    }

    removeAlbum = (id) => {
        console.log("delete albun", id)
        deleteAlbum(localStorage.getItem("album_access_token"), id)
            .then((album) => {
                console.log("album delete", album)
                if(album["data"].success === true) {
                    //update the state
                    let allAlbums = [...this.state.albums]
                    let index = allAlbums.findIndex(item => item._id === id)
                    if (index !== -1) {
                        allAlbums.splice(index, 1);
                        this.setState({albums: allAlbums});
                        alert("Album successfully deleted")
                    }
                }
            }).catch((error) => {
                let errorMessage = "An unexpected error happened" || error.message;
                alert(errorMessage)
            })
    }

    renderCreateButton = () =>{
        return (
            <div style={{marginTop: 30+"px", marginLeft: 50+"px" }}>
                <button onClick={this.goToCreateAlbum} className="create-button">CREATE BUTTON</button>
            </div>
        )
    }

    goToCreateAlbum = () => {
        this.props.history.push('/createAlbum');
    }

    editAlbum = (albumId) => {
        this.props.history.push(`/editAlbum/${albumId}`);
    }

    showAlbumDetails = (albumId) => {
        this.props.history.push(`/albumDetails/${albumId}`);
    }

    render() {
        if(!localStorage.getItem("album_access_token")) {
           return <Redirect to="/login" />
        }
        
        return (
            <>
            {this.renderCreateButton()}
            <AlbumCards
                removeAlbum={this.removeAlbum}
                albumData={this.state.albums} 
                editAlbum={this.editAlbum}
                showAlbumDetails={this.showAlbumDetails}
            />
            </>
        )    
    }
}

export default Album;