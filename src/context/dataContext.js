import React, { createContext, useState } from "react";

// Create a new context
export const DataContext = createContext();

// Create a data provider component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});

    // Function to update data
    const updateData = (newData) => {
        setData({ ...data, ...newData });
    };

    // Pass the data provider value to the children components
    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    );
};
