import React, { createContext } from "react";
import { initialStorage } from "./data";
import useLocalStorageState from "../hooks/useLocalStorageState";

// Create a new context
export const DataContext = createContext();

// Create a data provider component
export const DataProvider = ({ children }) => {
    // Retrieve the stored state from localStorage if available
    const [storage, setStorage] = useLocalStorageState(
        "storage",
        initialStorage
    );
    console.log("global state => ", storage);

    // Function to update data
    const updateData = (newData) => {
        console.log("newData => ", newData);
        const updatedStorage = { ...storage, ...newData };
        setStorage(updatedStorage);
    };

    // Pass the data provider value to the children components
    return (
        <DataContext.Provider value={{ storage, updateData }}>
            {children}
        </DataContext.Provider>
    );
};
