import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Smoothies</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothies</Link>
      </nav>
      <Routes>
        <Route path = "/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
