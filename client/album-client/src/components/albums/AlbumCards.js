import React from 'react';

const AlbumCards = ({ albumData, removeAlbum, editAlbum, showAlbumDetails }) => {
    return (
        albumData.map((item, index) => {
            return (
                 <div key={index} className="row">
                    <div className="column">
                        <div className="card">
                            <h4>{item.title}</h4>
                            <p>Upladed By @ogoelumeze</p>
                                <div className="actions">
                                    <button onClick={() => showAlbumDetails(item._id)} className="edit-button" style={{ backgroundColor: "darkcyan", marginRight: "10px" }} >SHOW</button>
                                    { item.createdBy === localStorage.getItem("album_userid") && 
                                    <>
                                    <button onClick={() => editAlbum(item._id)} className="edit-button" style={{marginRight: "10px" }}>EDIT</button>
                                    <button onClick={() => removeAlbum(item._id)} className="delete-button">DELETE</button>
                                    </>
                                    }
                                </div> 
                        </div>
                    </div>
                </div>   
            )
        })
       
    )
}

export default AlbumCards;