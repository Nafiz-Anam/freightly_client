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
import { GrForwardTen } from "react-icons/gr";
import "./listLayout.css";
import { DataContext } from "../context/dataContext";

const ListLayout = ({ data, step }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const { storage, updateData } = useContext(DataContext);

    const markedItems = {
        step1: storage.starting_point,
        step5: storage.pickup_floor,
        step6: storage.request_assistance,
        step8: storage.delivery_floor,
        step9: storage.delivery_Assistance,
    };

    useEffect(() => {
        setSelectedItem(markedItems[step] || "");
    }, [step, markedItems]);

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
        <GrForwardTen className="icon" />,
    ];

    const handleItemClick = (item) => {
        setSelectedItem(item);

        let updatedData = {};

        if (step === "step1" && item !== storage.starting_point) {
            updatedData = {
                ...storage,
                starting_point: item,
            };
        } else if (step === "step5" && item !== storage.pickup_floor) {
            updatedData = {
                ...storage,
                pickup_floor: item,
            };
        } else if (step === "step6" && item !== storage.request_assistance) {
            updatedData = {
                ...storage,
                request_assistance: item,
            };
        } else if (step === "step8" && item !== storage.delivery_floor) {
            updatedData = {
                ...storage,
                delivery_floor: item,
            };
        }

        if (Object.keys(updatedData).length !== 0) {
            updateData(updatedData);
        }
    };

    return (
        <div className="list-layout">
            <ul className="list">
                {data &&
                    data.map((item) => (
                        <li key={item.title}>
                            <button
                                className={`list-item ${
                                    item.cost && "item-flex"
                                } ${
                                    selectedItem &&
                                    selectedItem.title === item.title
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div style={{ textAlign: "left", width: "5%" }}>
                                    {item.icon && icon_arr[item.icon]}
                                </div>

                                <div
                                    style={{ textAlign: "left", width: "75%" }}
                                >
                                    <span className="item-name">
                                        {item.title}
                                    </span>
                                    {item.descriptions && (
                                        <p style={{ fontSize: ".8rem" }}>
                                            {item.descriptions}
                                        </p>
                                    )}
                                </div>
                                <div
                                    style={{ textAlign: "right", width: "20%" }}
                                >
                                    {item.cost && (
                                        <span className="item-name">
                                            {item.cost}
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
