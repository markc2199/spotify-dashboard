const StatCard = ({ title, image, name, text }) => {
    return (
        <div className="stat-card">
            <h3>{title}</h3>
            <img src={image}></img>
            <h4>{name}</h4>
            <p>{text}</p>
        </div>
    )
}

export default StatCard;