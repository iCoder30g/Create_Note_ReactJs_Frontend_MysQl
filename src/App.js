
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navber from './components/Navber';
import Footer from './components/Footer';
import CreateNote from './pages/CreateNote';
import ShowNote from './pages/ShowNote';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
        <Navber />
        <Routes>
          <Route exact path="/" element={<ShowNote />} />
          <Route path="/createnote" element={<CreateNote />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
