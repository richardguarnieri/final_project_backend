import logo from '../img/movies-on-the-house.jpg';
import { Link } from 'react-router-dom';

const CardsHorizontal = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Link to='/one'><img src={logo} alt="..." className='img-fluid' /></Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Visualization 1</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Link to='/two'><img src={logo} alt="..." className='img-fluid' /></Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Visualization 2</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Link to='/three'><img src={logo} alt="..." className='img-fluid' /></Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Visualization 3</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardsHorizontal
