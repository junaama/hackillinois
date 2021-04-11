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
        console.log('in handle submit')
        history.push("/dashboard")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for stocks" onChange={handleChange}/>
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;