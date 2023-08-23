import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import style from "./Step11.module.css";
import { DataContext } from "../context/dataContext";
import Papa from "papaparse";
import { Modal } from "react-bootstrap";
import { StepContext } from "../context/stepContext";
import { useNavigate } from "react-router-dom";

const Step11 = () => {
    const popupSheet =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=327490930&single=true&output=csv";

    const [activeTab, setActiveTab] = useState("personal");
    const { storage, updateData } = useContext(DataContext);
    const { activeStep, handleStepChange } = useContext(StepContext);
    const [popupData, setPopupData] = useState([]);
    const [alertShow, setAlertShow] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: storage.personal_details,
    });
    console.log(errors);

    useEffect(() => {
        const fetchPopupData = async () => {
            try {
                const response = await fetch(popupSheet);
                if (!response.ok) {
                    throw new Error("Failed to fetch sheet data");
                }
                const csvData = await response.text();
                const parsedData = Papa.parse(csvData, { header: true });
                const PopupJson = parsedData.data;
                // console.log("priceVolumeJson", priceVolumeJson);
                setPopupData(PopupJson);
            } catch (error) {
                console.error(error);
                return null;
            }
        };
        fetchPopupData();
    }, []);

    const onSubmit = (data) => {
        // console.log(data);
        updateData({
            // ...storage,
            personal_details: data,
        });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (
            storage &&
            storage.personal_details &&
            (storage.personal_details.companyName ||
                storage.personal_details.chamberOfCommerce ||
                storage.personal_details.vatNumber ||
                storage.personal_details.streetAddress ||
                storage.personal_details.postalCode ||
                storage.personal_details.area ||
                storage.personal_details.areaCode)
        ) {
            setActiveTab("business");
        }
    }, [storage]);

    useEffect(() => {
        if (
            storage.personal_details.agreePrivacy &&
            storage.personal_details.agreeTerms &&
            storage.request
        ) {
            setAlertShow(true);
        }
    }, [storage]);

    const handleContinue = () => {
        setAlertShow(false);
        navigate("/thankyouReq");
    };

    return (
        <>
            <form
                className={style.formContainer}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={style.tabContainer}>
                    <div className={style.tabButtons}>
                        <button
                            className={
                                activeTab === "personal" ? style.active : ""
                            }
                            onClick={() => handleTabChange("personal")}
                        >
                            Personal Contact Details
                        </button>
                        <button
                            className={
                                activeTab === "business" ? style.active : ""
                            }
                            onClick={() => handleTabChange("business")}
                        >
                            Business Contact Details
                        </button>
                    </div>

                    <div className={style.tab}>
                        <div className={style.section}>
                            <h3 style={{ marginBottom: "3%" }}>
                                Personal Details
                            </h3>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        {...register("firstName", {
                                            required: true,
                                        })}
                                    />
                                    {errors && errors.firstName ? (
                                        <span className={style.error_msg}>
                                            First name is required
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className={style.column}>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        {...register("lastName", {
                                            required: true,
                                        })}
                                    />
                                    {errors && errors.lastName ? (
                                        <span className={style.error_msg}>
                                            Last name is required
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", {
                                            required: true,
                                        })}
                                    />
                                    {errors && errors.email ? (
                                        <span className={style.error_msg}>
                                            Email address is required
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className={style.column}>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        {...register("phoneNumber", {
                                            required: true,
                                        })}
                                    />
                                    {errors && errors.phoneNumber ? (
                                        <span className={style.error_msg}>
                                            Phone number is required
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {activeTab === "business" && (
                    <div className={style.tab}>
                        <div className={style.businessSection}>
                            <h3 style={{ marginBottom: "3%" }}>
                                Company Details
                            </h3>
                            <div className={style.row}>
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    {...register("companyName")}
                                />
                            </div>
                            <div className={style.row}>
                                <label>Chamber of Commerce Number</label>
                                <input
                                    type="text"
                                    placeholder="Chamber of Commerce Number"
                                    {...register("chamberOfCommerce")}
                                />
                            </div>
                            <div className={style.row}>
                                <label>VAT Number</label>
                                <input
                                    type="text"
                                    placeholder="VAT Number"
                                    {...register("vatNumber")}
                                />
                            </div>
                            <div className={style.row}>
                                <label>Street Name + Number</label>
                                <input
                                    type="text"
                                    placeholder="Street Name + Number"
                                    {...register("streetAddress")}
                                />
                            </div>
                            <div className={style.row}>
                                <label>Postal Code</label>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    {...register("postalCode")}
                                />
                            </div>
                            <div className={style.row}>
                                <label>Area</label>
                                <input
                                    type="text"
                                    placeholder="Area"
                                    {...register("area")}
                                />
                            </div>
                            <div className={style.row}>
                                <label>Area Code</label>
                                <input
                                    type="text"
                                    placeholder="Area Code"
                                    {...register("areaCode")}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Checkboxes */}
                <div className={style.checkboxesContainer}>
                    <div className={style.checkbox}>
                        <input
                            type="checkbox"
                            id="newsletter"
                            {...register("newsletter")}
                        />
                        <label htmlFor="newsletter">
                            Yes, I would like to subscribe to Freightly
                            newsletter
                        </label>
                    </div>
                    <div className={style.checkbox}>
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            {...register("agreeTerms", { required: true })}
                        />
                        <label htmlFor="agreeTerms">
                            By making use of Freightly, you have to agree with{" "}
                            <a href="#">Freightly general terms</a>
                        </label>
                    </div>
                    <div className={style.checkbox}>
                        <input
                            type="checkbox"
                            id="agreePrivacy"
                            {...register("agreePrivacy", { required: true })}
                        />
                        <label htmlFor="agreePrivacy">
                            I agree with{" "}
                            <a href="#">Freightly Privacy statement</a>
                        </label>
                    </div>
                    {errors && errors.agreeTerms ? (
                        <span className={style.error_msg}>
                            Please agree to Freightly general terms
                        </span>
                    ) : (
                        ""
                    )}
                    {errors && errors.agreePrivacy ? (
                        <span className={style.error_msg}>
                            Please agree to Freightly Privacy statement
                        </span>
                    ) : (
                        ""
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>

            {/* alert modal */}
            <Modal
                show={alertShow}
                // onHide={() => setAlertShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {popupData[3] && popupData[3].title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p
                        style={{
                            textAlign: "center",
                            padding: "0px 0px 25px 0px",
                        }}
                    >
                        {popupData[3] && popupData[3].content}
                    </p>
                    {/* <h5 style={{ textAlign: "center", paddingBottom: "20px" }}>
                        Thank you for your patience
                    </h5> */}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleContinue} className="web-btn">
                        Submit a Request
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Step11;
