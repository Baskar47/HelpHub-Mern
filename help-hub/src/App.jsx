import { Routes, Route ,useLocation} from "react-router-dom";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import AdminDashBoard from './pages/admin/AdminDashBoard'
import AdminProblems from './pages/admin/AdminProblems'

// Pages
import Home from './pages/Home';
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AddProblem from './pages/AddProblem'
// import Footer from './components/common/Footer'
function App() {

const location=useLocation();

const hideNavbar=['/','/register','/admin/problems'];
const hideLayoutRoutes=['/','/register']
const hideLayout=hideLayoutRoutes.includes(location.pathname)


  return (
    <div className="flex flex-col min-h-screen">

      {!hideNavbar.includes(location.pathname) && <Navbar/> }
  
      {/* Top Navbar */}
      {/* <Navbar /> */}

      {/* Page Content */}
      <main className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetails />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path='post-problem' element={<AddProblem/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path='/admin' element={<AdminDashBoard/>}/>
          <Route path='/admin/problems' element={<AdminProblems/>}/>
         


        </Routes>
        {!hideLayout && <Footer/>}
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
