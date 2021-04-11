//** Renders Dashboard view with Watchlist, SearchBar, UpdateWatchlist, StockCard, StockChart components */
import Card from "../Stock/StockCard"

const Dashboard=(props)=>{
    return(
        <Card ticker={props.location.state}></Card>
    )
    
}

export default Dashboard 