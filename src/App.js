import logo from './logo.svg';
import './App.css';
import UserRegistration from './UserRegistration.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserRegistration 
          theme="dark"
          onSignIn={(params) => {
            console.log('onSignIn');
            console.log(JSON.stringify(params));
          }}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
