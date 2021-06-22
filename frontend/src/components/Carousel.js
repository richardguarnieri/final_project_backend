import logo from '../img/movies-on-the-house.jpg';
import viz1 from '../img/viz1.png';
import viz2 from '../img/viz2.png';

const Carousel = () => {
    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                    <img src={logo} className="d-block w-100 img-fluid" alt="..." />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src={viz1} className="d-block w-100 img-fluid" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Sunburst</h5>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img src={viz2} className="d-block w-100 img-fluid" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Bubble</h5>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel
