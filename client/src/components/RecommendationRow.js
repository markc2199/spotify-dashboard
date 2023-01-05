import { likeTrack } from '../utils.js';

const RecommendationRow = (props) => {
    const { num, id, name, image, artist } = props;
    return (
    
        
         <tr className='data-row'>
            <td>{num}</td>
            <td><img alt={name} src={image}></img></td>
            <td>{name}</td>
            <td>{artist}</td>
            <td id={num}>
                <button className='like-button' type='button' onClick={() => likeTrack(id, num)} value={id} id={id}>Add Song</button>
            </td>
        </tr>       
           
   
    )
}

export default RecommendationRow;