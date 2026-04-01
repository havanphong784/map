import {useState} from "react";

function SearchBox({onSearch}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search city or region"
        aria-label="Search place"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBox;
