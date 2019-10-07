import React from 'react';
import { Redirect } from 'react-router-dom';
import {  getAlbumDetails } from '../../services/albumServices';
import AlbumDetailCard from './AlbumDetailCard';

class AlbumDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            genre: "",
            releaseDate: ""
        }
    }

    componentDidMount() {
        //get the album Details
        const albumId = this.props.match["params"].albumId;
        getAlbumDetails(localStorage.getItem("album_access_token"), albumId)
            .then((response) => {
                console.log("response", response.data)
                if(response.data.success === true) {
                    this.setState({
                        title: response.data["album"].title,
                        genre: response.data["album"].genre,
                        releaseDate: response.data["album"].releaseDate
                    })
                }
            }).catch((error) => {
                let errorMessage = error.message || "Unable to fetch the album";
                alert(errorMessage);
            })
        console.log("album id", albumId);
    }

    render() {
        if(!localStorage.getItem("album_access_token")) {
            return <Redirect to="/login" />
        }
        
        return (
            <>
            <div style={{ margin: "auto", width: 100+"%", textAlign: "center" }}>
                <h4>Album Details</h4>
            </div>
            <AlbumDetailCard 
                title={this.state.title}
                releaseDate={this.state.releaseDate}
                genre={this.state.genre}
            />
            </>
        )
    }
}

export default AlbumDetails;