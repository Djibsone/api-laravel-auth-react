import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import EmailVerification from './components/EmailVerification';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Log from './dossierAMoi/Log';
import Form from './dossierAMoi/Form';

function App() {
  return (
    <div className="App">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/log' element={<Log />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/form' element={<Form />} />
          <Route path='/change-password' element={ <ProtectedRoute> <ChangePassword />  </ProtectedRoute>} />
          <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/email-verification" element={  <EmailVerification />} />
          <Route path="/forgot-password" element={ <ForgotPassword />} />
          <Route path='/profile' element = { <ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path='/home' element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
        </Routes>
    </div>
  );
}

export default App;