import { propTypes } from "react-bootstrap/esm/Image"
import { Link } from 'react-router-dom';


const Welcome = () => {
    return (
        <div className="container">
            <div className="row p-3">
                <div className='col'>
                    <h2 className="display-6 pt-4 pb-3">Welcome - IMDb Movies on React and D3</h2>
                    <p className="lead">Movies Dataset</p>
                    <p>Through this app you will be able to search and know more about the most rated movies that were filmed through 1894 - 1983. This app is powered by an IMDb Dataset.
IMDb is the most popular movie website and it combines movie plot description, Metastore ratings, critic and user ratings and reviews, release dates, and many more aspects.
IMDb stores information related to more than 6 million titles (of which almost 500,000 are featured films) and it is owned by Amazon since 1998.
Navigate in the seas of the old movies!</p>
                    <p>The dataset was extracted from <b>Kaggle:</b> <a href="https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset" target='_blank' className="link-dark">https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset</a></p>
                    <p>Feel free to visit our <b>Github Repository</b> by following <a href="https://github.com/richardguarnieri/project_2" target='_blank' className="link-dark">this</a> link.</p>
                    <div className="d-flex justify-content-center pt-4">
                        <Link to="/data" className="btn btn-dark btn-lg m-2">Movies Data</Link>
                        <Link to="/visualizations" className="btn btn-dark btn-lg m-2">Visualizations</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
