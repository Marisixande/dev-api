import { useState } from "react";
import "./App.css";
import Refris from "./components/Refris.jsx";

function App() {
  const [refrisA, setRefris] = useState([]);

  const pegarRefris = async () => {
    try {
      const res = await fetch("http://localhost:3000/soda");
      const data = await res.json();
      console.log("Refris!", data);
      setRefris(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={pegarRefris}>Pegar os refris!</button>
      <Refris refrisB={refrisA}/>
    </div>
  );
}

export default App;
