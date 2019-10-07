import React from 'react';

const AlbumDetailCard = ({ title, genre, releaseDate, creator}) => {
    return (
        <div className="album-detail-row">
            <div className="album-detail-card">
                <h2>{title.toUpperCase()}</h2>

                <div className="album-detail-item">
                    <div className="album-detail-caption">
                        <p>GENRE</p>
                    </div>
                    <div className="album-detail-value">
                        <p>{genre.toUpperCase()}</p>
                    </div>
                </div>

                
                <div className="album-detail-item">
                    <div className="album-detail-caption">
                        <p>RELEASE DATE</p>
                    </div>
                    <div className="album-detail-value">
                        <p>{releaseDate}</p>
                    </div>
                </div>


                <div className="album-detail-item">
                    <div className="album-detail-caption">
                        <p>OWNER</p>
                    </div>
                    <div className="album-detail-value">
                        <p>{creator}</p>
                    </div>
                </div>

                <p>
                    <button className="album-detail-button">ADD TO FAVORITE</button>
                </p>
            </div>  
        </div>
             
    )
}

export default AlbumDetailCard;