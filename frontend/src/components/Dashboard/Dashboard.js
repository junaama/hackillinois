//** Renders Dashboard view with Watchlist, SearchBar, UpdateWatchlist, StockCard, StockChart components */
import Navbar from "../Layout/Nav";
import SearchBar from "../SearchBar";
import Card from "../Stock/StockCard";
import BarGraph from "../Stock/horizontalBar"

const Dashboard = (props) => {
  return (
    <div className="min-h-screen bg-blue-darkest">
      <Navbar />
      <SearchBar />

      <div>
        {props.location.state ? (
          <Card ticker={props.location.state} showAddWatchlist={true}></Card>
        ) : (
          <p className="text-base text-white font-semibold tracking-wide uppercase text-center">
            Search for a stock!
          </p>
        )}
      </div>
      <div>
        <BarGraph/>
      </div>


    </div>
  );
};

export default Dashboard;
