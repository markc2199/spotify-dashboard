import { logout } from '../spotify.js';
import '../styles/Nav.css';

const Nav = () => {
    return (
    <div>
        <nav className="sticky">
            <ul className='main-nav'>
                <h3 className='logo'>Spotify Dashboard</h3>
                <h3 className='nav-item'><a className='nav-item-link' href='/'>Home</a></h3>
                <h3 className='nav-item'><a href='/recommendations' className='nav-item-link'>Recommendations</a></h3>
                <button className='push' onClick={logout}>Logout</button>
            </ul>
        </nav>
    </div>
    )
}

export default Nav;