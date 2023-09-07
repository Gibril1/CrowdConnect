import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Home, Register, Login, Conversation, Dashboard } from './pages/index';
import { EditEvent, EventForm } from './components/index'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/chat/:entry_code" element={<Conversation/>}/>
          <Route path="/new" element={<EventForm/>}/>
          <Route path="/events" element={<Dashboard/>}/>
          <Route path="/events/event/:id" element={<EditEvent/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
