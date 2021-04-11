//** Renders Dashboard view with Watchlist, SearchBar, UpdateWatchlist, StockCard, StockChart components */
import Navbar from "../Layout/Nav"
import SearchBar from "../SearchBar"
import Card from "../Stock/StockCard"

const Dashboard=(props)=>{
    return(
        <>
        {/* Navbar not rendering correctly */}
        <Navbar/> 
        <SearchBar/>
        {props.location.state ? <Card ticker={props.location.state}></Card> : "Search for a stock!"}
        
        </>
        
    )
    
}

export default Dashboard 