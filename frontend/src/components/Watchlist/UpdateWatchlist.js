//**Renders button to add stock to watchlist to be used across multiple components */
import { database, db } from "../../firebase";
import { AuthContext } from "../UserAuth/FirebaseAuth";
import { useContext } from "react";
const UpdateWatchlist = () => {
  const { currentUser } = useContext(AuthContext);

  const handleClick = (props) => {
    sendStock();
  };
  const sendStock = async () => {
      // change mydata to selected stock from props
    const mydata = { name: "JNJ" };

    try {
      await database.ref("users").child(currentUser.uid).push(mydata);
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
        <p>Login to save stocks to your watchlist.</p>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>Add To Watchlist</button>
    </div>
  );
};
export default UpdateWatchlist;
