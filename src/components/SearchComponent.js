import React, { useState } from "react";
import "./search.css";

const SearchComponent = ({ items }) => {
    console.log(items);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    let jaja = [];
    for (let val of items) {
        console.log(val);
        let temp = {
            title: val[0],
            id: val[0],
        };
        jaja.push(temp);
    }

    console.log(jaja);

    // const jsonData = [
    //     { id: 1, title: "Apple" },
    //     { id: 2, title: "Banana" },
    //     { id: 3, title: "Orange" },
    //     { id: 4, title: "Mango" },
    //     { id: 5, title: "Grapes" },
    //     { id: 6, title: "Pineapple" },
    //     { id: 7, title: "Watermelon" },
    //     { id: 8, title: "Strawberry" },
    //     { id: 9, title: "Blueberry" },
    //     { id: 10, title: "Kiwi" },
    //     { id: 11, title: "Peach" },
    //     { id: 12, title: "Pear" },
    //     { id: 13, title: "Cherry" },
    //     { id: 14, title: "Lemon" },
    //     { id: 15, title: "Raspberry" },
    // ];

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredResults = jaja.filter((item) =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(filteredResults.slice(0, 10));
    };

    return (
        <div className="search-component">
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
