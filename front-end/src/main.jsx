import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import axios from "./api/requestService.js";

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App/>
                <ToastContainer/>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
