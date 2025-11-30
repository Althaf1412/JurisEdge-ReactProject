import './App.css';
import Faruk from './Faruk';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './Services';
import Appointment from './Appointment';
import Contact from './Contact';

function App() {
  return (
    <div className="App">
      <Router basename="/JurisEdge-ReactProject">
        <Routes>
          <Route path="/" element={<Faruk />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;