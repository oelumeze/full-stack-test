import React from 'react';
import { Redirect } from 'react-router-dom';
import { createNewAlbum } from '../../services/albumServices';

class AlbumForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            albumTitle: "",
            genre: "",
            releaseDate: "",
            artist: ""
        }
        this.setAlbumTitle = this.setAlbumTitle.bind(this);
        this.setGenre = this.setGenre.bind(this);
        this.setReleaseDate = this.setReleaseDate.bind(this);
        this.createNewAlbum = this.createNewAlbum.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    setAlbumTitle = (_event) => {
        this.setState({
            albumTitle: _event.target.value
        })
    }

    setGenre = (_event) => {
        this.setState({
            genre: _event.target.value
        })
    }

    setReleaseDate = (_event) => {
        this.setState({
            releaseDate: _event.target.value
        })
    }

    clearState = () => {
        this.setState({
            albumTitle: "",
            genre: "",
            releaseDate: ""
        })
    }

    createNewAlbum = (event) => {
        event.preventDefault();
        if(localStorage.getItem("album_access_token")) {
            let albumInfo = {
                title: this.state.albumTitle,
                genre: this.state.genre,
                releaseDate: this.state.releaseDate
            };
            createNewAlbum(localStorage.getItem("album_access_token"), albumInfo)
                .then((response) => {
                    if (response["data"].success === true) {
                        alert("Album successfully created")
                        this.clearState()
                    }
                })
                .catch((error) => {
                    let errorMessage = error.message || "An unexpected error occured";
                    alert(errorMessage);
                })
        }
    }

    render() {
        if(!localStorage.getItem("album_access_token")) {
            return <Redirect to="/login" />
        }

        return (
            <div className="loginForm">
            <h2>Create Album</h2>
            <form onSubmit={this.createNewAlbum}>
               <div className="form-group">
                   <div className="form-label">
                       <label htmlFor="albumTitle"> Album Title </label>
                   </div>

                   <div className="form-input">
                       <input type="text" onChange={this.setAlbumTitle} placeholder="Enter Album Title" value={this.state.albumTitle} required/>
                   </div>
                </div>

                <div className="form-group">
                   <div className="form-label">
                       <label htmlFor="genre"> Genre </label>
                   </div>

                   <div className="form-input">
                       <input type="text" onChange={this.setGenre} placeholder="Enter Genre" value={this.state.genre} required/>
                   </div>
                </div>

                <div className="form-group">
                    <div className="form-label">
                       <label htmlFor="releaseDate"> Release Date </label>
                    </div>

                    <div className="form-input">
                       <input type="date" onChange={this.setReleaseDate}  value={this.state.releaseDate} />
                    </div>
                </div>

                <div className="form-group">
                    <button id="submit" name="submit" className="primary-btn">CREATE ALBUM</button>
                </div>

            </form>
       </div>
        )
    }
}

export default AlbumForm;