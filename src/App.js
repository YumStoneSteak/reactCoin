import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [userMoney, setUserMoney] = useState("1");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const calMoney = (coin) => userMoney / coin;

  return (
    <div className="App">
      <h1>coins ({loading ? null : coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <input
            type="number"
            placeholder="how much do you have in"
            onChange={(e) => setUserMoney(e.target.value)}
            value={userMoney}
          ></input>{" "}
          USD
          <br />
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol} : {calMoney(coin.quotes.USD.price)}{" "}
                USD)
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default App;
