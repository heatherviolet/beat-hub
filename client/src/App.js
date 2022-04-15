import './App.css';
import Nav from "./components/Nav"
require("bootstrap");

function App() {
  return (
    <div className="App">
      <header className="App-header d-flex align-items-start justify-content-start">
        <Nav />
      </header>
    </div>
  );
}

export default App;
