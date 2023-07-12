import React, { createContext, useState } from "react";

// Create a new context
export const DataContext = createContext();

// Create a data provider component
export const DataProvider = ({ children }) => {
    let initialStorage = {
        starting_point: "",
        selected_items: [],
        pickup_date: "",
        pickup_time: "",
        pickup_floor: "",
        pickup_Assistance: "",
        delivery_time: "",
        delivery_floor: "",
        delivery_Assistance: "",
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

    const [storage, setStorage] = useState(initialStorage);

    // Function to update data
    const updateData = (newData) => {
        setStorage({ ...storage, ...newData });
    };

    // Pass the data provider value to the children components
    return (
        <DataContext.Provider value={{ storage, updateData }}>
            {children}
        </DataContext.Provider>
    );
};
