import Caballeros from "./components/Caballeros";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Caballeros del Zodiaco</h1>
      </header>

      <main className="main-container">
        <Caballeros />
      </main>
    </div>
  );
}

export default App;
