import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAlbumDetails, editAlbum } from '../../services/albumServices';

class EditAlbum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            albumId: "",
            genre: "",
            title: "",
            releaseDate: ""
        }
        this.updateAlbumTitle = this.updateAlbumTitle.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
        this.updateReleaseDate = this.updateReleaseDate.bind(this);
        this.editAlbum = this.editAlbum.bind(this);
    }

    updateAlbumTitle = (_event) => {
        this.setState({
            title: _event.target.value
        })
    }

    updateGenre = (_event) => {
        this.setState({
            genre: _event.target.value
        })
    }

    updateReleaseDate = (_event) => {
        this.setState({
            releaseDate: _event.target.value
        })
    }

    editAlbum = (event) => {
        event.preventDefault();
        let editAlbumInfo = {
            title: this.state.title,
            genre: this.state.genre,
            releaseDate: this.state.releaseDate
        }
        editAlbum(localStorage.getItem("album_access_token"), this.state.albumId, editAlbumInfo)
            .then((response) => {
                if(response.data.success) {
                    alert("Album Successfully Updated")
                }
            })
            .catch((error) => {
                let errorMessage = error.message || "An unexpected error happened";
                alert(errorMessage);
            })
    }

    componentDidMount() {
       const { albumId } = this.props.match.params;

       //fetch the details of the album
            getAlbumDetails(localStorage.getItem("album_access_token"), albumId)
            .then((response) => {
                console.log("success", response.data)
                if(response.data.success === true) {
                    this.setState({
                        genre: response["data"].album.genre,
                        title: response["data"].album.title,
                        releaseDate: response["data"].album.releaseDate,
                        albumId: albumId
                    })
                } else {
                    let errorMessage = response["data"].message || "Sorry, we are unable to edit the album"
                    alert(errorMessage);
                }
            }).catch((error) => {
                let errorMessage = error.message || "An unexpected error happened";
                alert(errorMessage);
            })
    }

    render() {
        if(!localStorage.getItem("album_access_token")) {
            return <Redirect to="/login" />
        }

       return (
           <div className="loginForm">
               <h2>Edit Album : {this.state.title.toUpperCase()}</h2>
               <form onSubmit={this.editAlbum}>
                   <div className="form-group">
                       <div className="form-label">
                           <label htmlFor="albumTitle"> Album Title </label>
                       </div>

                       <div className="form-input">
                           <input type="text" onChange={this.updateAlbumTitle} placeholder="Enter Album Title" value={this.state.title} required />
                       </div>
                   </div>

                   <div className="form-group">
                       <div className="form-label">
                           <label htmlFor="genre"> Genre </label>
                       </div>

                       <div className="form-input">
                           <input type="text" onChange={this.updateGenre} placeholder="Enter Genre" value={this.state.genre} required />
                       </div>
                   </div>

                   <div className="form-group">
                       <div className="form-label">
                           <label htmlFor="releaseDate"> Release Date </label>
                       </div>

                       <div className="form-input">
                           <input type="date" onChange={this.updateReleaseDate} value={this.state.releaseDate} />
                       </div>
                   </div>

                   <div className="form-group">
                       <button id="submit" name="submit" className="primary-btn">EDIT ALBUM</button>
                   </div>

               </form>
           </div>
       )
    }
}

export default EditAlbum;