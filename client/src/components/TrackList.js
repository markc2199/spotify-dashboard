import TrackRow from './TrackRow.js';
import '../styles/TrackList.css';

const TrackList = ({ tracks }) => {
    const trackArray = tracks.map((track, i) => {
        return <TrackRow
            key={i + 1}
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
                <th></th>
                <th></th>
            </tr>
         </thead>
         <tbody>
            
             {trackArray.map((row) => {
                return <TrackRow 
                    key={row.props.key}
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

export default TrackList;