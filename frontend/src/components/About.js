const About = () => {
    return (
        <div className="container">
            <div className="row p-3">
                <div className='col'>
                    <h2 className="display-4 text-center p-5">About us</h2>
                    <p className="lead">Information from the team</p>
                    <p>Project team consists of the following members:</p>
                        <ul>
                            <li>ABC</li>
                            <li>ABC</li>
                            <li>ABC</li>
                            <li>ABC</li>
                            <li>ABC</li>
                            <li>ABC</li>
                            <li>ABC</li>
                            <li>ABC</li>
                        </ul>
                    <p className="lead">Dataset information</p>
                    <p>The dataset was extracted from <b>Kaggle:</b> <a href="https://www.kaggle.com/shivamb/netflix-shows" target='_blank' className="link-dark">https://www.kaggle.com/shivamb/netflix-shows</a></p>
                    <p className="lead">Github Repo</p>
                    <p>Feel free to visit our <b>Github Repository</b> by following <a href="https://github.com/richardguarnieri/project_2" target='_blank' className="link-dark">this</a> link.</p>
                </div>
            </div>
        </div>
    )
}
export default About