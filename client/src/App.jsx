import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import Form from './components/Form'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/form' element={<Form />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;