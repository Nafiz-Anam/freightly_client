import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./step13.css";

const Step13 = () => {
    const { register, handleSubmit } = useForm();
    const [activeTab, setActiveTab] = useState("personal");

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="tab-container">
                <div className="tab-buttons">
                    <button
                        className={activeTab === "personal" ? "active" : ""}
                        onClick={() => handleTabChange("personal")}
                    >
                        Personal Contact Details
                    </button>
                    <button
                        className={activeTab === "business" ? "active" : ""}
                        onClick={() => handleTabChange("business")}
                    >
                        Business Contact Details
                    </button>
                </div>

                {activeTab === "personal" && (
                    <div className="tab">
                        <div className="section">
                            <h3>Personal Detials</h3>
                            <div className="row">
                                <div className="column">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                    />
                                </div>
                                <div className="column">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <label>Email:</label>
                                    <input type="text" {...register("email")} />
                                </div>
                                <div className="column">
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        {...register("phoneNumber")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "business" && (
                    <div className="tab">
                        <div className="section">
                            <h3>Personal Detials</h3>
                            <div className="row">
                                <div className="column">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                    />
                                </div>
                                <div className="column">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <label>Email:</label>
                                    <input type="text" {...register("email")} />
                                </div>
                                <div className="column">
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        {...register("phoneNumber")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <h3>Company Details</h3>
                            <div className="">
                                <div className="column">
                                    <label>Company Name:</label>
                                    <input
                                        type="text"
                                        {...register("companyName")}
                                    />
                                </div>
                                <div className="column">
                                    <label>Chamber of Commerce Number:</label>
                                    <input
                                        type="text"
                                        {...register("chamberOfCommerce")}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div className="column">
                                    <label>VAT Number:</label>
                                    <input
                                        type="text"
                                        {...register("vatNumber")}
                                    />
                                </div>
                                <div className="column">
                                    <label>Street Name + Number:</label>
                                    <input
                                        type="text"
                                        {...register("streetAddress")}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div className="column">
                                    <label>Postal Code:</label>
                                    <input
                                        type="text"
                                        {...register("postalCode")}
                                    />
                                </div>
                                <div className="column">
                                    <label>Area:</label>
                                    <input type="text" {...register("area")} />
                                </div>
                            </div>
                            <div className="">
                                <div className="column">
                                    <label>Area Code:</label>
                                    <input
                                        type="text"
                                        {...register("areaCode")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Step13;
