import { useState } from "react"
import "./style.css"

const Search = (props) => {

    const [inputValue, setInputValue] = useState('')

    const {getData} = props;


   function handleInputValue(event) {
    const {value} = event.target;
    setInputValue(value)
    
   }

   function handleSubmit(event) {
    event.preventDefault()
    getData(inputValue)
   }

    return(
        <form className="search" onSubmit={handleSubmit}>
            <input name="Search" onChange={handleInputValue} value={inputValue} placeholder="Search Recipes" />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search