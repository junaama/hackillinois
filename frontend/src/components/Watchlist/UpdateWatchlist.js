//**Renders button to add stock to watchlist to be used across multiple components */
import { database, db } from "../../firebase";
import { AuthContext } from "../UserAuth/FirebaseAuth";
import { useContext } from "react";
import {Link} from 'react-router-dom'
const UpdateWatchlist = (props) => {
  const { currentUser } = useContext(AuthContext);
  const ticker = props.ticker;

  const handleClick = () => {
    sendStock();
  };
  const sendStock = async () => {
    try {
      await database.ref("users").child(currentUser.uid).push(ticker);
    } catch (error) {
      console.error(error);
    }
  };

  if (currentUser) {
    console.log("Current User On?", currentUser.uid);
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-white text-center">
          <Link to="/login" className="bg-red-bold text-white py-2 px-2 border-1 border-red-deeper rounded">Login to save stocks to your watchlist.</Link>
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <button onClick={handleClick} className="m-8 bg-red-bold hover:bg-blue-500 text-purple-lightest hover:text-white py-2 px-2 border-1 border-red-deeper hover:border-transparent rounded">
        <span className="text-white">Add To Watchlist</span>
      </button>
    </div>
  );
};
export default UpdateWatchlist;
