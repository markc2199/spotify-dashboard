import React from "react";
import '../styles/Card.css'

const ArtistCard = (props) => {
    const { name, image } = props;
    return (
            <div className="card">
                <img src={image}></img>
                <h3>{name}</h3>
            </div>
    );
}

export default ArtistCard;