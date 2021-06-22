import logo from '../img/movies-on-the-house.jpg';

const Banner = () => {
    return (
        <div className="container">
            <div className="row">
                <div className='col'>
                    <img src={logo} alt="Movies Logo" className='img-fluid'/>
                </div>
            </div>
        </div>
    )
}

export default Banner
