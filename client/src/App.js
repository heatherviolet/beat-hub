import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Route exact path="/login">

<Login />

</Route>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Route exact path="/login" component={Login} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
