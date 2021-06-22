import logo from '../img/movies-on-the-house.jpg';
import viz1 from '../img/viz1.png';
import viz2 from '../img/viz2.png';
import { Link } from 'react-router-dom';

const CardsHorizontal = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Link to='/one'><img src={viz1} alt="..." className='img-fluid' /></Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Movies by Genre - Sunburst</h5>
                                    <p className="card-text">This graph categorizes the top 10 movies from the selected year based on their genres. Each genre is shown in one color in the inner circle of the graph. The movie titles are shown in the outer circle of the graph and their color matches the genre they belong to</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Link to='/two'><img src={viz2} alt="..." className='img-fluid' /></Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Movies by Country, Language and Genre</h5>
                                    <p className="card-text">In this chart you can select the contry, language and genre of your choice, based on that we will show you the 20 best rated movies, and graphically display their duration, rating, and year of release!</p>
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
