import {Navigate, Route, Routes} from "react-router-dom";
import {RouterName} from "../routers/router.js";
import LogIn from "../pages/LogIn.jsx";
import RegistrationPage from "../pages/Registration.jsx";

export const GuestComponents = () => {
    return <>
        <Routes>
            <Route path={RouterName.SIGN_IN} element={<LogIn/>}/>
            <Route path={RouterName.REGISTRATION} element={<RegistrationPage/>}/>
            <Route path={'/*'} element={<Navigate to={RouterName.SIGN_IN}/>}/>
        </Routes>
    </>
}