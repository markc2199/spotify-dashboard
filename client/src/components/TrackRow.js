
const TrackRow = (props) => {
    const { key, num, name, image, artist } = props;
    return (
    
        
         <tr className="data-row">
            <td>{num}</td>
            <td><img src={image}></img></td>
            <td>{name}</td>
            <td>{artist}</td>
        </tr>       
           
   
    )
}

export default TrackRow;