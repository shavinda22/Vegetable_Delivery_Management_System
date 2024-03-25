import "./App.css";
import Navbar from "./components/Navbar.js";
import Home from "./screens/Home.js";
import About_Us from "./screens/About_Us.js";
import Orders_Status from "./screens/Orders_Status.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import Policy from "./screens/Policy";
import Admin from "./screens/Admin";
import Customer from "./screens/Customer";
import Updatepage from "./screens/Updatepage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About_Us} />
        <Route path="/orders" Component={Orders_Status} />
        <Route path="/signup" Component={Signup} />
        <Route path="/signin" Component={Signin} />
        <Route path="/policy" Component={Policy} />
        <Route path="/admin" Component={Admin} />
        <Route path="/customer" Component={Customer} />
        <Route path="/update/:id" Component={Updatepage} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
