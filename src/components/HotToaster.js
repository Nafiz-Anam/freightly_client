import React from "react";
import { Toaster } from "react-hot-toast";

const HotToaster = () => {
    return (
        <Toaster
            className="mt-6"
            position="top-right"
            toastOptions={{
                // Define default options
                // duration: 3000,
                style: {
                    background: "orange",
                    color: "#000",
                },
                // Default options for specific types
                success: {
                    duration: 3000,
                    style: {
                        background: "#00ff77",
                        color: "#000",
                    },
                },
                error: {
                    duration: 3000,
                    style: {
                        background: "red",
                        color: "#000",
                    },
                },
            }}
        />
    );
};

export default HotToaster;
