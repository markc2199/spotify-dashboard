import { useState, useEffect } from 'react';
import ArtistList from '../components/ArtistList.js';
import TrackList from '../components/TrackList.js';
import { getTopArtists, getCurrentUserProfile, getTopTracks, getPlaylists } from '../spotify.js';
import '../styles/Dashboard.css';
import Nav from '../components/Nav.js';
import StatCard from '../components/StatCard.js';
import { deepCut } from '../utils.js';

const Dashboard = () => {
    const [userTopArtists, setUserTopArtists] = useState(null);
    const[userProfile, setUserProfile] = useState(null);
    const [userTopTracks, setUserTopTracks] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState(null);
    const [userDeepCut, setDeepCut] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Grab top artists
            try {
                const { data } = await getTopArtists();
                setUserTopArtists(data);
            } catch(e) {
                console.error(e);
            }
            //Grab user profile info
            try {
                const { data } = await getCurrentUserProfile();
                setUserProfile(data);
            } catch(e) {
                console.error(e);
            }
            //Grab user top tracks and find "deep cut" 
            try {
                const { data } = await getTopTracks();
                setUserTopTracks(data);
                const deepCutData = deepCut(data);
                setDeepCut(deepCutData);
            } catch(e) {
                console.error(e);
            }
            //Grab user playlist data
            try {
                const { data } = await getPlaylists();
                setUserPlaylists(data);
            } catch(e) {
                console.error(e);
            }
        } 

        fetchData();

    }, []);

return (
    <div className='main-container'>

            <Nav />

            {userProfile && userPlaylists && (
                <div className='dashboard-header'>
                    <h3 className='summary-title'>This months trends at a glance</h3>
                    <div className='user-info-div'>
                        <h3 className='user-name'>Welcome {userProfile.display_name}</h3>
                        <h4 className='user-info'>Followers: {userProfile.followers.total} | Playlists: {userPlaylists.total}</h4>
                    </div>
                </div>
            )}

            {/* summary */}
            {userTopArtists && userTopTracks && userDeepCut && (
                <div className='summary-grid-wrapper'>
                    <StatCard 
                        title='Top Artist'
                        image={userTopArtists.items[0].images[1].url}
                        name={userTopArtists.items[0].name}
                        text={`In the last 30 days, ${userTopArtists.items[0].name} is your #1 Artist`}
                    />
                    <StatCard 
                        title='Top Song'
                        image={userTopTracks.items[0].album.images[1].url}
                        name={userTopTracks.items[0].name}
                        text={`In the last 30 days, ${userTopTracks.items[0].name} by ${userTopTracks.items[0].artists[0].name} is your #1 Song`}
                    />
                    <StatCard 
                        title='Deep Cut'
                        image={userDeepCut.album.images[1].url}
                        name={userDeepCut.name}
                        text={`With a popularity score of ${userDeepCut.popularity} (out of 100) ${userDeepCut.name} by ${userDeepCut.artists[0].name} is the deepest cut in your top songs. You trendsetter!`}
                    />
                </div>
            )}
        
            {userTopArtists && (
            <>
                <div>
                    <h3 className='top-title'>Your top artists this month</h3>
                </div>
            
                <div className='grid-wrapper'>
                    {<ArtistList artists={userTopArtists.items}/>}
                </div>
            </>
            )}
            
        {userTopTracks && (
        <>
            <div className='top-title-div'>
                <h3 className='top-title songs-title'>Your top songs this month</h3>
            </div>
                <div className='dashboard-top-songs'>
                { <TrackList 
                    tracks={userTopTracks.items}
                /> }
                </div>
        </>
        )}
    </div>
    );
}   

export default Dashboard;