import React, { useState } from "react";
import { FaHome, FaWarehouse } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiAuctionFill } from "react-icons/ri";
import "./listLayout.css";

const ListLayout = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState("");

    let icon_arr = [
        <FaHome className="icon" />,
        <AiFillShop className="icon" />,
        <HiBuildingOffice2 className="icon" />,
        <FaWarehouse className="icon" />,
        <RiAuctionFill className="icon" />,
    ];

    const handleItemClick = (itemValue) => {
        setSelectedItem(itemValue);
    };

    return (
        <div className="list-layout">
            <ul className="list">
                {data &&
                    data.map((item) => (
                        <li key={item.title}>
                            <button
                                className={`list-item ${
                                    item.price && "item-flex"
                                } ${
                                    selectedItem === item.title
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleItemClick(item.title)}
                            >
                                {item.icon && icon_arr[item.icon]}
                                <div style={{ textAlign: "left" }}>
                                    <span className="item-name">
                                        {item.title}
                                    </span>
                                    {item.desc && <p>{item.desc}</p>}
                                </div>
                                {item.price && (
                                    <span className="item-name">
                                        {item.price}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ListLayout;
