//** Renders Dashboard view with Watchlist, SearchBar, UpdateWatchlist, StockCard, StockChart components */
import Card from "../Stock/StockCard";
import Dropdown from "../Dropdown/Dropdown";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 5em;
  margin-right: 5em;
  min-height: 74vh;
`;

const Dashboard = (props) => {
  return (
    <Container>
      <Dropdown />
      <div>
        {props.location.state ? (
          <Card ticker={props.location.state} showAddWatchlist={true}></Card>
        ) : (
          <p className="text-base text-white font-semibold tracking-wide uppercase text-center">
            Search for a stock!
          </p>
        )}
      </div>
  );
};

export default Dashboard;
