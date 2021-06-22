import { Link } from 'react-router-dom';

const Three = () => {
    return (
        <div>
            <div className="container">
            <div className="row p-3">
                <div className='col'>
                    <h2 className="display-6 pt-3 pb-3">Chart: X vs. Y (3)</h2>
                    <p className="lead">Chart Analysis - Written Description</p>
                    <p>The following chart shows... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <hr className='mt-4 mb-4'/>
                <div className="col">
                    <h1 className='text-center'>Chart Area</h1>
                </div>
                <div className="d-flex justify-content-center pt-4">
                        <Link to="/visualizations" className="btn btn-dark btn-lg m-2">Back to Visualizations</Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Three
