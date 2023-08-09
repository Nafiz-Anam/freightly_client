import React, { useState } from "react";
import style from "./SearchComponent.module.css";
import { MdArrowForwardIos } from "react-icons/md";

const SearchComponent = ({ items, setModalShow, setSelectedItem }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // let items = [["bike"], ["car"], ["bed"]];
    console.log(items);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredResults = items.filter((item) =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(filteredResults.slice(0, 10));
    };

    const handleItemClick = (item) => {
        // console.log("item", item);
        // const filteredData = items.filter((item) => item.title === title);
        setSelectedItem(item);
        setModalShow(false);
    };

    return (
        <div className={style.searchComponent}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search Items..."
                className={style.searchInput}
            />

            <ul className={style.searchResults}>
                {searchResults.map((item, index) => (
                    <li
                        key={index}
                        className={style.listItem}
                        onClick={() => handleItemClick(item)}
                    >
                        {item.title}
                    </li>
                ))}

                {searchResults.length === 0 && searchTerm ? (
                    <li
                        className={style.listItem}
                        onClick={() =>
                            handleItemClick({
                                materials:
                                    "Glass,Wood,Solid wood,Steel,Marble,Metal,Concrete",
                                sizes: "",
                                title: "Custom Item",
                                weight_kg: "",
                            })
                        }
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        Not found? Add your item manually <MdArrowForwardIos />
                    </li>
                ) : (
                    ""
                )}
            </ul>
        </div>
    );
};

export default SearchComponent;
