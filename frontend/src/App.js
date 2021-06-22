// Components
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Data from './components/Data';
import Visualizations from './components/Visualizations';

// Pages
import One from './components/One';
import Two from './components/Two';
import About from './components/About';

// Router
import { BrowserRouter as Router, Route} from 'react-router-dom';

// CSS
import './App.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <Route path='/' exact render={(props) => (
          <>
            <Banner />
            <Welcome />
          </>
        )} />
        <Route path='/data' component={Data} />
        <Route path='/visualizations' component={Visualizations} />
        <Route path='/one' component={One} />
        <Route path='/two' component={Two} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
