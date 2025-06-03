import { useState } from "react"

export default function SearchBar({onSearch}){

const [searchTerm , setSearchTerm] = useState("");

const handleSubmit = (e) =>{
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
    
}




    return (
        <form onSubmit={handleSubmit}>
<input 
type="text"
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
placeholder="Search for Movies..."



/>
<button type="submit">Search</button>

        </form>
    )

}