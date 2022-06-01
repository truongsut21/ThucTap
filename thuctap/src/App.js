import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

function App() {
  // tạo 1 function reducer
  // đổi state cũ thành state moi
  function counter(state = 0, action) {
    switch (action.type) {
      case "cong":
        return state + 1;
     
      case "tru":
        return state - 1;
        

      default:
        return state;
    }
  }

  // khởi tạo store với reducer
  // có 3 hàng đi với nó ( subcribe, dispatch, getstate)

  let store = createStore(counter);

  // đăng ki cho state khi thay đổi thi sẽ update tới giao diện
  store.subscribe(() => {
    console.log(store.getState());
    document.getElementById('stateHTML').innerHTML = `state ${store.getState()}`
  });

  // test
  function cong() {
    store.dispatch({ type: "cong" });
  }

  function tru() {
    store.dispatch({ type: "tru" });
  }


  return (
    <div className="App">
      <header className="App-header">
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

        <h1 id="stateHTML">State</h1>
        <button onClick={cong}>cong state</button>
        <button onClick={tru}>tru state</button>

      </header>
    </div>
  );
}

export default App;
