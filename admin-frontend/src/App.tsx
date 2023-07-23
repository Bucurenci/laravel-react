import { useState } from 'react'
import './App.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare} from "@fortawesome/free-regular-svg-icons";

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
      setCount((count) => count + 1)
  }

  return (
    <div className="container">
      <div>
          <a href="#" className="btn btn-primary">Aaaaa</a>
          <FontAwesomeIcon icon={faCheckSquare} />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
