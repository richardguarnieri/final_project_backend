import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-light text-center mt-auto">
            <div className="container">
                <div className="row p-3">
                    <div className="col">
                        <p className="m-0">Copyright &copy; 2021 | <a href="https://github.com/richardguarnieri/project_2" target='_blank'><FaGithub /></a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
