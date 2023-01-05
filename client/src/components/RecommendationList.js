import RecommendationRow from './RecommendationRow.js';
import '../styles/TrackList.css';
import { refresh } from '../utils.js'

const RecommendationList = ({ tracks }) => {
    const trackArray = tracks.map((track, i) => {
        return <RecommendationRow
            // key={i + 1}
            id={tracks[i].id}
            num={i + 1}
            image={tracks[i].album.images[2].url}
            name={tracks[i].name}
            artist={tracks[i].artists[0].name}
        />
    });

    return (
   
       <table className='top-songs-table'>
         <thead>
            <tr>
                <th></th>
                <th></th>
                <th>Song</th>
                <th>Artist</th>
                <th>
                    <button className ='refresh-button' onClick={() => refresh()}>Refresh</button>
                </th>
                
            </tr>
         </thead>
         <tbody>
            
             {trackArray.map((row) => {
                return <RecommendationRow 
                    // key={row.props.key}
                    id={row.props.id}
                    num={row.props.num}
                    image={row.props.image}
                    name={row.props.name}
                    artist={row.props.artist
                    }
                />
             })}
         </tbody>
       </table> 
    )
}

export default RecommendationList;