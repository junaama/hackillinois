import { useEffect, useState } from "react";
import { database } from "../../firebase";
import StockCard from "../Stock/StockCard";
import { AuthContext } from "../UserAuth/FirebaseAuth";
import { useContext } from "react";
import Navbar from "../Layout/Nav";
const Watchlist = (props) => {
  const [stocks, setStocks] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const stockRef = database.ref("users/" + currentUser.uid);
    stockRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        setStocks(Object.values(snapshot.val()));
      }
    });
  }, []);
  let stocksInWatchlist = ""
  if (stocks) {
    stocksInWatchlist = stocks.map((item) => {
      return (
        <div className="p-2 flex-row">
          <StockCard ticker={item} showAddWatchlist={false} />
        </div>
      );
    });
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-darkest text-white text-center">
        {stocksInWatchlist === "" ? stocksInWatchlist : "No stocks added to your watchlist yet!"}
      </div>
    </>
  );
};
export default Watchlist;
