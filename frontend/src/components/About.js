const About = () => {
    return (
        <div className="container">
            <div className="row p-3">
                <div className='col'>
                    <h2 className="display-4 text-center p-5">About us</h2>
                    <p className="lead">Information from the team</p>
                    <p>It all began with some data cleansing. We identified two databases that had film records we could use to build the project - we cleaned the data using Python's Pandas library which we joined using PostgreSQL relational database management system (RDBMS). For the backend, we decided on Flask to create the API routes that would feed into the frontend. The frontend was built using Facebook's React which allowed us to easily create and maintain all individual UI components. The server, the backend and frontend were all hosted through "Heroku", taking advantage of the free service.</p>


<p className='fw-bold'>Sunburst Visualization:</p>
<p>One of our visualizations shows a sunburst graph. This graph categorizes the top 10 movies from the selected year based on their genres. Each genre is shown in one color in the inner circle of the graph. The movie titles are shown in the outer circle of the graph and their color matches the genre they belong to.</p>
<p className='fw-bold'>Bubble Visualization:</p>
<p>In this visualization we show in bubbles the top 20 movies filtered in the options you choose of country, language and genre, it allows you to compare them with each other showing you their rating, year of realease and duration in a visual way.</p>
                    <p className="lead">Dataset information</p>
                    <p>The dataset was extracted from <b>Kaggle:</b> <a href="https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset" target='_blank' className="link-dark">https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset</a></p>
                    <p className="lead">Github Repo</p>
                    <p>Feel free to visit our <b>Github Repository</b> by following <a href="https://github.com/richardguarnieri/project_2" target='_blank' className="link-dark">this</a> link.</p>
                </div>
            </div>
        </div>
    )
}
export default About