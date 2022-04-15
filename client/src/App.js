import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header d-flex align-items-start justify-content-start">
          <Nav />
        </header>
        <Routes>
          <Route exact path="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
