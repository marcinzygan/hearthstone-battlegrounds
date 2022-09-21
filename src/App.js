import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  //STATE
  const [cards, setCards] = useState([]);

  // API CALL FOR BACKEND
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/cards",
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;

        setCards(data);
        console.log(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className="App">
      {cards.map((card) => {
        return <h1>{card.name}</h1>;
      })}
    </div>
  );
}

export default App;
