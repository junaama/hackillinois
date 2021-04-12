//** Renders Dashboard view with Watchlist, SearchBar, UpdateWatchlist, StockCard, StockChart components */
import Card from "../Stock/StockCard";
import Dropdown from "../Dropdown/Dropdown";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 5em;
  margin-right: 5em;
  min-height: 85vh;
`;

const Dashboard = (props) => {
  return (
    <Container>
      <Dropdown />
      <div>
        {props.location.state ? (
          <Card ticker={props.location.state} showAddWatchlist={true}></Card>
        ) : (
          null
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
