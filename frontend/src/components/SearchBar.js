//**Renders Search Bar to be used across pages */
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const SearchBar = () => {
    const history = useHistory()
    const [ticker, setTicker] = useState("")
    const handleChange = (e)=> {
        setTicker(e.target.value)

    }
    const handleSubmit = (e)=> {
        e.preventDefault();
        history.push("/dashboard", ticker)
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label id="listbox-label" class="block text-sm font-medium text-gray-700" for="Stocks">Choose a Stock:</label>
                <select name="Stocks" onChange={handleChange} value={ticker}>
                    <option value=""></option>
                    <option value="Tesla">Tesla</option>
                    <option value="Qualcomm">Qualcomm</option>
                    <option value="Apple">Apple</option>
                    <option value="Robinhood">Robinhood</option>
                    <option value="Doordash">Doordash</option>
                    <option value="United Airlines">United Airlines</option>
                    <option value="Goldman Sachs">Goldman Sachs</option>
                    <option value="J&J">J&#38;J</option>
                    <option value="TMobile">T-Mobile</option>
                </select>
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;