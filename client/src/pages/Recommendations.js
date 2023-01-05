import { useState, useEffect } from 'react';
import { getRecommendedTracks, getTopTracks } from "../spotify";
import '../styles/Recommendations.css';
import RecommendationList from '../components/RecommendationList';

const Recomendations = () => {
    const [recommendations, setRecommendations] = useState(null);
    // eslint-disable-next-line
    const [topTracks, setTopTracks] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            let seed_songs = []
            //Get top tracks
            try {
                const { data } = await getTopTracks();
                setTopTracks(data);
                // Get top 5 songs to use as "seed songs" for recommendations
                for (let i = 0; i < 5; i++) {
                    seed_songs.push(data.items[i].id)
                }
            } catch(e) {
                console.log(e);
            }
            // Get recommendations
            try {
                const { data } = await getRecommendedTracks(seed_songs);
                setRecommendations(data);
            } catch(e) {
                console.log(e);
            } 
        }

        fetchData();

    }, [])

    return (
    <div className='main-container-rec'>
        {recommendations && (
        <>
            <div className='rec-heading'>
                <h1>Recommendations</h1>
                <div className='sub-head-rec'>
                    <p>
                        Songs we think you'll like based on your current taste.
                        <br></br>
                        Click "Add Song" to add the song to your library. Or, hit "Refresh" for a new set of recommendations.
                    </p>
                </div>
            </div>
            <div className='rec-table-container' id='rec-table'>
                <RecommendationList 
                    tracks={recommendations.tracks}
                />
            </div>
        </>
        )}
    </div>
    )
}

export default Recomendations;