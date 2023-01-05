import React from "react";
import ArtistCard from "./ArtistCard";

const ArtistList = ({ artists }) => {
  const artistArray = artists.map((user, i) => {
      return <ArtistCard 
          key={i} 
          name={artists[i].name} 
          image={artists[i].images[0].url} 
          />
  });
  return (
    <>
        {artistArray.slice(0,10)}
    </>
      
  );
}

export default ArtistList;