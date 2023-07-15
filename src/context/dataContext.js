import React, { createContext, useState } from "react";

// Create a new context
export const DataContext = createContext();

// Create a data provider component
export const DataProvider = ({ children }) => {
    let initialStorage = {
        starting_point: {
            icon: "",
            title: "",
        },
        selected_items: [],
        pickup_date: {
            date: "",
            day: "",
            cost: "",
        },
        pickup_time: {
            time: "",
            cost: "",
        },
        pickup_floor: {
            cost: "",
            desc: "",
            icon: "",
            title: "",
        },
        pickup_Assistance: {
            cost: "",
            icon: "",
            title: "",
        },
        delivery_time: {
            time: "",
            cost: "",
        },
        delivery_floor: {
            cost: "",
            desc: "",
            icon: "",
            title: "",
        },
        delivery_Assistance: {
            cost: "",
            icon: "",
            title: "",
        },
        pickup_contact: {
            pickup_address: "",
            name: "",
            email: "",
            phone: "",
        },
        delivery_contact: {
            delivery_address: "",
            name: "",
            email: "",
            phone: "",
        },
        personal_details: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            company_name: "",
            coc_number: "",
            vat_number: "",
            company_address: "",
            postal_code: "",
            area: "",
            area_code: "",
        },
    };

    // Retrieve the stored state from localStorage if available
    const storedStorage = localStorage.getItem("storage");
    const [storage, setStorage] = useState(
        storedStorage ? JSON.parse(storedStorage) : initialStorage
    );

    // Function to update data
    const updateData = (newData) => {
        const updatedStorage = { ...storage, ...newData };
        setStorage(updatedStorage);

        // Store the updated state in localStorage
        localStorage.setItem("storage", JSON.stringify(updatedStorage));
    };

    // Pass the data provider value to the children components
    return (
        <DataContext.Provider value={{ storage, updateData }}>
            {children}
        </DataContext.Provider>
    );
};
