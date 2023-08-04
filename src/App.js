import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Alerts from './components/Alerts';
import AlertContext from './context/AlertContext';
import { useState } from 'react';


function App() {

  //creating the states for the alerts
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({ msg: "", type: "" });

  const showAlert = (msg, type) => {

    setAlert({ msg: msg, type: type });
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }

  return (
    <>

      <BrowserRouter>


        <AlertContext.Provider value={{ showAlert }}>

          <NoteState>

            <Navbar />

            <div className="container d-flex justify-content-end" style={{
              position: "sticky",
              top: "3rem", height: "3rem"
            }}>

              {visible && <Alerts alert={alert} />}
            </div>

            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="about/*" element={<About />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/signup/*" element={<Signup />} />

            </Routes>


          </NoteState>
        </AlertContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
