import React, { useState } from "react";
// import { DropzoneArea } from "material-ui-dropzone";
import style from "./SearchComponent.module.css";

const SearchComponent = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

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

    const handleItemClick = (item) => {
        const newItem = {
            name: item.title,
            width: "",
            length: "",
            height: "",
            images: [],
            count: "",
        };
        setSelectedItems((prevItems) => [...prevItems, newItem]);
    };

    const handleWidthChange = (e, index) => {
        const { value } = e.target;
        setSelectedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].width = value;
            return updatedItems;
        });
    };

    const handleLengthChange = (e, index) => {
        const { value } = e.target;
        setSelectedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].length = value;
            return updatedItems;
        });
    };

    const handleHeightChange = (e, index) => {
        const { value } = e.target;
        setSelectedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].height = value;
            return updatedItems;
        });
    };

    const handleImageDrop = (images, index) => {
        setSelectedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].images = images;
            return updatedItems;
        });
    };

    const handleCountChange = (e, index) => {
        const { value } = e.target;
        setSelectedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].count = value;
            return updatedItems;
        });
    };

    const handleAddButtonClick = () => {
        // Save selected items with input values
        console.log(selectedItems);

        // Clear input fields
        setSelectedItems([]);
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
                {searchResults.map((item) => (
                    <li
                        key={item.id}
                        className={style.listItem}
                        onClick={() => handleItemClick(item)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>

            {selectedItems.length > 0 && (
                <div>
                    <h2>Selected Items</h2>
                    {selectedItems.map((item, index) => (
                        <div key={index}>
                            <h3>{item.name}</h3>
                            <div>
                                <label>Width:</label>
                                <input
                                    type="text"
                                    value={item.width}
                                    onChange={(e) =>
                                        handleWidthChange(e, index)
                                    }
                                />
                            </div>
                            <div>
                                <label>Length:</label>
                                <input
                                    type="text"
                                    value={item.length}
                                    onChange={(e) =>
                                        handleLengthChange(e, index)
                                    }
                                />
                            </div>
                            <div>
                                <label>Height:</label>
                                <input
                                    type="text"
                                    value={item.height}
                                    onChange={(e) =>
                                        handleHeightChange(e, index)
                                    }
                                />
                            </div>
                            <div>
                                <label>Images:</label>
                                {/* <DropzoneArea
                                    acceptedFiles={["image/*"]}
                                    filesLimit={3}
                                    dropzoneText="Drag and drop or click to upload images"
                                    onChange={(files) =>
                                        handleImageDrop(files, index)
                                    }
                                /> */}
                            </div>
                            <div>
                                <label>Count:</label>
                                <input
                                    type="text"
                                    value={item.count}
                                    onChange={(e) =>
                                        handleCountChange(e, index)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddButtonClick}>Add</button>
                </div>
            )}

            {/* Implement the new view to display the selected items */}
            {/* You can use the state variable 'selectedItems' to render the list of items */}
        </div>
    );
};

export default SearchComponent;
