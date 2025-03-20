import {AdminComponents} from "./components/AdminComponents.jsx";
import {GuestComponents} from "./components/GuestComponents.jsx";
import {useEffect, useState} from "react";

function App() {
    const [token, setToken] = useState('')
    useEffect(() => {
        const tokenLocal = localStorage.getItem('token')
        if (tokenLocal) {
            setToken(tokenLocal)
        }
    }, []);
    return (
        token ? <AdminComponents/> : <GuestComponents/>
    )
}

export default App
