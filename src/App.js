import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Company from "./Components/Pages/Company";
import Contact from "./Components/Pages/Contact";
import NewProject from "./Components/Pages/NewProject";
import Container from "./Components/Layout/JS/Container";
import Navbar from './Components/Layout/JS/Navbar';
import Footer from './Components/Layout/JS/Footer';
import Projects from "./Components/Pages/Projects";
import Project from "./Components/Pages/Project";

function App() {
  return (

    <Router>
        <Navbar/>
      <Container customClass="min-height">
      <Routes>
        <Route path="/" element= {< Home />}/>
        <Route path="/company" element= {< Company />}/>
        <Route path="/projects" element= {< Projects />}/>
        <Route path="/contact" element= {< Contact />}/>
        <Route path="/newproject" element= {< NewProject />}/>
        <Route path="/project/:id" element= {< Project />}/>
      </Routes>
      </Container>
    <Footer/>
    </Router>
  );
}


export default App;

