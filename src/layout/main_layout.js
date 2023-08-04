import React, { useContext, useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
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

    console.log("isPhone", isPhone);

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
                    <div className={style.pageContent}>
                        <div className={style.pageContent}>{children}</div>
                    </div>
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
                        <button className={style["next-button-disabled"]}>
                            <GoArrowLeft className={style.arrowRight} />
                            Previous
                        </button>
                    ) : (
                        <Link
                            className={style["next-button"]}
                            to={"/step" + (activeStep - 1)}
                            onClick={handlePrevious}
                        >
                            <GoArrowLeft className={style.arrowRight} />
                            Previous
                        </Link>
                    )}

                    {activeStep <= 10 ? (
                        <Link
                            className={style["next-button"]}
                            to={"/step" + (activeStep + 1)}
                            onClick={handleNext}
                        >
                            Continue
                            <GoArrowRight className={style.arrowRight} />
                        </Link>
                    ) : isLoading ? (
                        <Link className={style["next-button"]}>
                            Checkout <Spinner />
                        </Link>
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
                <div className={style["footer-container-right"]}></div>
            </div>
        </div>
    );
});

export default Layout;
