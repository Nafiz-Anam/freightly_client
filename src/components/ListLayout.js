import React, { useContext, useState, useEffect } from "react";
import { FaHome, FaWarehouse } from "react-icons/fa";
import {
    FaUserPlus,
    FaTruckRampBox,
    FaUserGroup,
    FaUserMinus,
    Fa0,
    Fa1,
    Fa2,
    Fa3,
    Fa4,
    Fa5,
    Fa6,
    Fa7,
    Fa8,
    Fa9,
} from "react-icons/fa6";
import { AiFillShop } from "react-icons/ai";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiAuctionFill } from "react-icons/ri";
import { PiDoorFill, PiElevatorFill } from "react-icons/pi";
import "./listLayout.css";
import { DataContext } from "../context/dataContext";

const ListLayout = ({ data, step }) => {
    const [selectedItem, setSelectedItem] = useState("");
    console.log("selectedItem =>", selectedItem);
    const { storage, updateData } = useContext(DataContext);
    console.log("storage =>", storage);

    let icon_arr = [
        <FaHome className="icon" />,
        <AiFillShop className="icon" />,
        <HiBuildingOffice2 className="icon" />,
        <FaWarehouse className="icon" />,
        <RiAuctionFill className="icon" />,
        <FaUserPlus className="icon" />,
        <FaTruckRampBox className="icon" />,
        <FaUserGroup className="icon" />,
        <FaUserMinus className="icon" />,
        <Fa1 className="icon" />,
        <Fa2 className="icon" />,
        <Fa3 className="icon" />,
        <Fa4 className="icon" />,
        <Fa5 className="icon" />,
        <Fa6 className="icon" />,
        <Fa7 className="icon" />,
        <Fa8 className="icon" />,
        <Fa9 className="icon" />,
        <Fa0 className="icon" />,
        <PiDoorFill className="icon" />,
        <PiElevatorFill className="icon" />,
    ];

    useEffect(() => {
        let updatedData = {};

        if (step === "step1" && selectedItem !== storage.starting_point) {
            updatedData = {
                ...storage,
                starting_point: selectedItem,
            };
        } else if (step === "step5" && selectedItem !== storage.pickup_floor) {
            updatedData = {
                ...storage,
                pickup_floor: selectedItem,
            };
        } else if (
            step === "step6" &&
            selectedItem !== storage.pickup_Assistance
        ) {
            updatedData = {
                ...storage,
                pickup_Assistance: selectedItem,
            };
        } else if (
            step === "step8" &&
            selectedItem !== storage.delivery_floor
        ) {
            updatedData = {
                ...storage,
                delivery_floor: selectedItem,
            };
        } else if (
            step === "step9" &&
            selectedItem !== storage.delivery_Assistance
        ) {
            updatedData = {
                ...storage,
                delivery_Assistance: selectedItem,
            };
        }

        if (Object.keys(updatedData).length !== 0) {
            updateData(updatedData);
        }
    }, [selectedItem, step, storage]);

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
                                <div style={{ textAlign: "left", width: "5%" }}>
                                    {item.icon && icon_arr[item.icon]}
                                </div>

                                <div
                                    style={{ textAlign: "left", width: "55%" }}
                                >
                                    <span className="item-name">
                                        {item.title}
                                    </span>
                                    {item.desc && <p>{item.desc}</p>}
                                </div>
                                <div
                                    style={{ textAlign: "right", width: "40%" }}
                                >
                                    {item.price && (
                                        <span className="item-name">
                                            {item.price}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ListLayout;
