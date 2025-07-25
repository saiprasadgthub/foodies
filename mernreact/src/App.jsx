
import './App.css'
import Login from './Login'
import Home from './pages/Home.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
}from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import Myorder from './components/Myorder.jsx';

function App() {
  
return(
  <CartProvider>
  <Router>
  <div>
    
    <Routes>
      <Route exact path="/" element={<Home></Home>} />
 <Route exact path="/login" element={<Login></Login>} />
  <Route exact path="/createuser" element={<Signup></Signup>} />
   <Route exact path="/myorderdata" element={<Myorder>
   </Myorder>} />

      
    </Routes>
      
      
      
    
  </div>
  </Router>
  </CartProvider>
)

}

export default App
