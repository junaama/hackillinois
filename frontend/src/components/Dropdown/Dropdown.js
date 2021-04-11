import React, { useRef, useState } from 'react';
import { useInFocus } from '../../hooks/useInFocus';
import { Container, Search, Content } from './Styles';
import { useHistory } from "react-router";

const Dropdown = () => {

  const stocks = ["Tesla", "Qualcomm", "Apple", "Robinhood", "Doordash", "United Airlines", "Goldman Sachs", "J&J", "TMobile"];

  const dropdownRef = useRef();
  const refInFocus = useInFocus(dropdownRef);
  const [ searchInput, setSearchInput ] = useState("");
  const history = useHistory();
  const [clicked, setClicked ] = useState(false);
  
  const handleSearchInputChange = (e) => {
    setClicked(false);
    setSearchInput(e.target.value);
  };

  const handleOnClick = (ticker) => {
    setSearchInput("");
    setClicked(true);
    history.push("/dashboard", ticker);
  };

  const filteredStocks = stocks.filter(elem => elem.toLowerCase().includes(searchInput.toLowerCase())).slice(0, 5);

  return (
    <Container ref={dropdownRef} className="dropdown">
      <Search autoComplete="off" name="keywords" value={searchInput} onChange={handleSearchInputChange} type="search" className="search" placeholder="Search for stocks" />
      <Content className="dropdown-content">
        {!clicked && refInFocus && searchInput ? filteredStocks.map((stock, index) => <div className="dropdown-item" onClick={handleOnClick.bind(null, stock)} key={index}>{stock}</div>) : null}
      </Content>
    </Container>
  );
};

export default Dropdown;