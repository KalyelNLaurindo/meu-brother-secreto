import Home from './pages/Home';
import ConfigPage from './pages/ConfigPage';
import AddPage from './pages/AddPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </Router>
  );
}

export default App;
