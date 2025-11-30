import { useEffect, useState } from "react";

export default function Search() {
  const [search,setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
        const [isBtnDisabled, setBtnDisabled] = useState(false);


    

 useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(search); // updated only after delay
    }, 500); // debounce 500ms

    return () => clearTimeout(timeoutId); // cancel previous timer
  }, [search]);

  useEffect(() => {
    if (debouncedValue) {
      console.log("API call with:", debouncedValue);
      alert(`Searching for: ${debouncedValue}`);
      setBtnDisabled(false);
    }
   
  }, [debouncedValue]);


const handleSearch = (e) => {
  setSearch(e.target.value);
}

const throttle = () => {
  if(!debouncedValue){
window.alert("Please enter a search term");
return;
  }
  console.log("Throttled Search Clicked:", search);}

  return (
    <div>
      <h1>Search Page</h1>
      <p>This is the search page of the application.</p>
      <button onClick={() => throttle()} disabled={isBtnDisabled}>Search</button>
      <input type="text" placeholder="Search..."  value={search} onChange={handleSearch}/>
    </div>
  );
}