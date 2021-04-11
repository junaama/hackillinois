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
      <div>
        <p className="text-white text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Link to="/login">Login</Link> to save stocks to your watchlist.
        </p>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>
        <span className="text-white">Add To Watchlist</span>
      </button>
    </div>
  );
};
export default UpdateWatchlist;
