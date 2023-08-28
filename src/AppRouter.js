import React from "react";
import { Route, Routes } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import Step7 from "./components/Step7";
import Step8 from "./components/Step8";
import Step9 from "./components/Step9";
import Step10 from "./components/Step10";
import Step11 from "./components/Step11";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
            <Route path="/step4" element={<Step4 />} />
            <Route path="/step5" element={<Step5 />} />
            <Route path="/step6" element={<Step6 />} />
            <Route path="/step7" element={<Step7 />} />
            <Route path="/step8" element={<Step8 />} />
            <Route path="/step9" element={<Step9 />} />
            <Route path="/step10" element={<Step10 />} />
            <Route path="/step11" element={<Step11 />} />
        </Routes>
    );
};

export default AppRouter;
