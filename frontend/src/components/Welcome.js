import { propTypes } from "react-bootstrap/esm/Image"
import { Link } from 'react-router-dom';


const Welcome = () => {
    return (
        <div className="container">
            <div className="row p-3">
                <div className='col'>
                    <h2 className="display-6 pt-4 pb-3">Welcome - Netflix Movies and TV Shows built on React and D3</h2>
                    <p className="lead">Netflix Movies and TV Shows Dataset</p>
                    <p>The dataset consists of tv shows and movies available on Netflix as of 2019. It is collected from Flixable which is a third-party Netflix search engine. In 2018, they released an interesting report which shows that the number of TV shows on Netflix has nearly tripled since 2010. The streaming service’s number of movies has decreased by more than 2,000 titles since 2010, while its number of TV shows has nearly tripled. It will be interesting to explore what all other insights can be obtained from the same dataset. Integrating this dataset with other external datasets such as IMDB ratings, rotten tomatoes can also provide many interesting findings.</p>
                    <p>The dataset was extracted from <b>Kaggle:</b> <a href="https://www.kaggle.com/shivamb/netflix-shows" target='_blank' className="link-dark">https://www.kaggle.com/shivamb/netflix-shows</a></p>
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
