import React, { useContext, useState, lazy, Suspense, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { StepContext } from "../context/stepContext";
import style from "./main_layout.module.css";
import { DataContext } from "../context/dataContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const Summary = lazy(() => import("../components/summary"));

const Layout = React.memo(({ children }) => {
    const { activeStep, handleStepChange } = useContext(StepContext);
    const { storage } = useContext(DataContext);
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const isPhone = window.innerWidth < 600;
    const [inactive, setInactive] = useState(true);

    useEffect(() => {
        setInactive(true);
        if (activeStep === 1 && storage.starting_point.title !== "") {
            if (
                storage.starting_point.title === "Auction" &&
                storage.auction_details.auction_name === ""
            ) {
                setInactive(true);
            } else {
                setInactive(false);
            }
        }
        if (activeStep === 2 && storage.selected_items.length > 0) {
            setInactive(false);
        }
        if (activeStep === 3 && storage.pickup_date.date !== "") {
            setInactive(false);
        }
        if (activeStep === 4 && storage.pickup_time.time !== "") {
            setInactive(false);
        }
        if (activeStep === 5 && storage.pickup_floor.title !== "") {
            setInactive(false);
        }
        if (activeStep === 6 && storage.request_assistance.title !== "") {
            setInactive(false);
        }
        if (activeStep === 7 && storage.delivery_time.time !== "") {
            setInactive(false);
        }
        if (activeStep === 8 && storage.delivery_floor.title !== "") {
            setInactive(false);
        }
        if (activeStep === 9 && storage.pickup_contact.name !== "") {
            setInactive(false);
        }
        if (activeStep === 10 && storage.delivery_contact.name !== "") {
            setInactive(false);
        }
        if (activeStep === 11 && storage.personal_details.firstName !== "") {
            setInactive(false);
        }
    }, [activeStep, storage]);

    // console.log("isPhone", isPhone);

    const handleNext = () => {
        handleStepChange(activeStep + 1);
    };

    const handlePrevious = () => {
        handleStepChange(activeStep - 1);
    };

    let orderData = {
        total_price: storage.total_price,
    };

    let makePayment = async () => {
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/payment/create`, {
                orderData,
            })
            .then((result) => {
                console.log(result);
                setClientSecret(result.data.clientSecret);
                // Navigate to the checkout page with the clientSecret parameter
                navigate(
                    `/checkout?clientSecret=${encodeURIComponent(
                        result.data.clientSecret
                    )}`
                );
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    let handlePayment = () => {
        setIsLoading(true);
        makePayment();
    };

    const [show, setShow] = useState(false);
    const handleSummary = () => {
        setShow(!show);
    };

    return (
        <div className={style.app}>
            {/* Top Bar */}
            <div className={style.topBar}>
                <div>
                    <a href="https://freightly.nl/">
                        <img
                            src="https://freightly.nl/wp-content/uploads/2023/06/white_text-logoname_color1_NObackground-2048x143.png"
                            style={{
                                objectFit: "contain",
                                margin: "auto",
                                height: "20px",
                            }}
                            alt="Freightly Company Logo"
                        />
                    </a>
                </div>
            </div>

            {/* Main Body */}
            <div className={style.mainBody}>
                <div className={style.leftSide}>
                    {/* Render the current step */}
                    {show ? (
                        <div
                            style={{ paddingTop: "100px" }}
                            className={style.pageContent}
                        >
                            <Suspense fallback={<div>Loading summary...</div>}>
                                <Summary />
                            </Suspense>
                        </div>
                    ) : (
                        <div className={style.pageContent}>{children}</div>
                    )}
                </div>

                {!isPhone ? (
                    <div className={style.rightSide}>
                        {/* Summary details and calculation here */}
                        <Suspense fallback={<div>Loading summary...</div>}>
                            <Summary />
                        </Suspense>
                    </div>
                ) : (
                    ""
                )}
            </div>

            {/* Footer */}
            <div className={style.footer}>
                <div className={style.footerContainer}>
                    {activeStep === 1 ? (
                        <button
                            className={
                                !isPhone
                                    ? style["next-button-disabled"]
                                    : style["mobile-button-disabled"]
                            }
                        >
                            <GoArrowLeft className={style.arrowRight} />
                            {isPhone ? "" : `Previous`}
                        </button>
                    ) : (
                        <Link
                            className={
                                !isPhone
                                    ? style["next-button"]
                                    : style["mobile-button"]
                            }
                            to={"/step" + (activeStep - 1)}
                            onClick={handlePrevious}
                        >
                            <GoArrowLeft className={style.arrowRight} />
                            {isPhone ? "" : `Previous`}
                        </Link>
                    )}

                    {isPhone ? (
                        <div className="mobile_summary" onClick={handleSummary}>
                            <p>
                                {show ? (
                                    <AiOutlineArrowDown />
                                ) : (
                                    <AiOutlineArrowUp />
                                )}{" "}
                                Transport Summary
                            </p>
                            <h2>
                                €{parseFloat(storage.total_price).toFixed(2)}
                            </h2>
                        </div>
                    ) : (
                        ""
                    )}

                    {activeStep <= 10 ? (
                        inactive ? (
                            ""
                        ) : (
                            <Link
                                className={style["next-button"]}
                                to={"/step" + (activeStep + 1)}
                                onClick={handleNext}
                            >
                                Continue
                                <GoArrowRight className={style.arrowRight} />
                            </Link>
                        )
                    ) : isLoading ? (
                        <Link className={style["next-button"]}>
                            Checkout <Spinner />
                        </Link>
                    ) : inactive ? (
                        ""
                    ) : (
                        <Link
                            className={style["next-button"]}
                            onClick={handlePayment}
                        >
                            Checkout{" "}
                            <GoArrowRight className={style.arrowRight} />
                        </Link>
                    )}
                </div>
                {!isPhone ? (
                    <div className={style["footer-container-right"]}></div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
});

export default Layout;
