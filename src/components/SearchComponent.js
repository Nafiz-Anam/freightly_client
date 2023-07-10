import React, { useState } from "react";
import "./search.css";

const SearchComponent = ({ items }) => {
    console.log(items);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    let products = [];
    for (let val of items) {
        let temp = {
            title: val[0],
            id: val[0],
        };
        products.push(temp);
    }

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredResults = products.filter((item) =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(filteredResults.slice(0, 10));
    };

    return (
        <div className="search-component">
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                }}
            >
                List Your Items for Transport
            </h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                className="search-input"
            />

            <ul className="search-results">
                {searchResults.map((item) => (
                    <li key={item.id} className="list-item">
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
