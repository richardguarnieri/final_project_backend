import Carousel from './Carousel';
import Cards from './Cards';
import CardsHorizontal from './CardsHorizontal';


const Visualizations = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Carousel />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="display-4 text-center p-5">Visualizations</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CardsHorizontal />
                </div>
            </div>
        </div>
    )
}

export default Visualizations
