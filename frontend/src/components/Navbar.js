import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container">
                <Link className="navbar-brand" to="/">{title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/data">Movies Data</Link></li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="/visualizations" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Visualizations
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link class="dropdown-item" to="/visualizations">Visualizations</Link></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><Link class="dropdown-item" to="/one">Visualization 1</Link></li>
                                <li><Link class="dropdown-item" to="/two">Visualization 2</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                    </ul>   
                </div>
            </div>
        </nav>
    )
}

Navbar.defaultProps = {
    title: 'IMDb Movies',
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Navbar
