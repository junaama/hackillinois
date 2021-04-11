import { useEffect, useState } from "react";
import { database } from "../../firebase";
import StockCard from "../Stock/StockCard";
import { AuthContext } from "../UserAuth/FirebaseAuth";
import { useContext } from "react";
const Watchlist = () => {
  const [stocks, setStocks] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const stockRef = database.ref("users/" + currentUser.uid);

    stockRef.on("value", (snapshot) => {
      setStocks(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <div>
      {stocks.map((stock) => {
        <StockCard ticker={stock.name} />;
      })}
    </div>
  );
};
export default Watchlist;
