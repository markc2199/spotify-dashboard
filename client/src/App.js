import {  useEffect, useState } from 'react';
import './App.css';
import { accessToken } from './spotify';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard';
import Recomendations from './pages/Recommendations';
import Nav from './components/Nav';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {

    setToken(accessToken);

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
        <Login />
        ) : (
            <Router>
              <Routes>
                <Route
                  path="/recommendations"
                  element={
                  <>
                    <Nav />
                    <Recomendations />
                  </>
                  }>
                </Route>
                <Route
                  path="/"
                  element={<Dashboard />}>
                </Route>
              </Routes>
            </Router>   
    )}
    </header>
    </div>
)}

export default App;
