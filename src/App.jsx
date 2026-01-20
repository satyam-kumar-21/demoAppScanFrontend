import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RestaurantQR from './pages/RestaurantQR';
import RiderScan from './pages/RiderScan';
import './index.css';

function App() {
      return (
            <Router>
                  <div className="app-container">
                        <nav className="navbar">
                              <div className="nav-brand">QuickPick Demo</div>
                              <div className="nav-links">
                                    <Link to="/restaurant" className="nav-link">Restaurant</Link>
                                    <Link to="/rider" className="nav-link">Rider</Link>
                              </div>
                        </nav>

                        <main className="main-content">
                              <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/restaurant" element={<RestaurantQR />} />
                                    <Route path="/rider" element={<RiderScan />} />
                              </Routes>
                        </main>
                  </div>
            </Router>
      );
}

function Home() {
      return (
            <div className="home-screen">
                  <h1>Delivery Pickup System</h1>
                  <div className="role-selection">
                        <Link to="/restaurant" className="card">
                              <h2>I'm a Restaurant</h2>
                              <p>Generate QR Code for Pickups</p>
                        </Link>
                        <Link to="/rider" className="card">
                              <h2>I'm a Rider</h2>
                              <p>Scan QR to Confirm Pickup</p>
                        </Link>
                  </div>
            </div>
      );
}

export default App;
