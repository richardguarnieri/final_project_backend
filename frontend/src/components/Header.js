import PropTypes from 'prop-types'

const Header = ({ title }) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: 'Netflix Movies and TV Shows'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
