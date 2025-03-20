import {Link} from "react-router-dom";
import {RouterName} from "../routers/router.js";
import {useEffect, useState} from "react";
import {useLogin} from "../api/mutations.js";
import {toast} from "react-toastify";

export default function LogIn() {
    const {mutate, isPending, isSuccess, isError, data} = useLogin()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleClick = async () => {
        mutate(formData)
    }

    useEffect(() => {
        if (isError) {
            toast.error('Something went wrong')
        }
        if (isSuccess) {
            if(data.token){
                localStorage.setItem('token', data.token)
                window.location.reload()
            }
        }
    }, [isError, isSuccess]);
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        value={formData.email}
                        name={'email'}
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        value={formData.password}
                        name={'password'}
                        onChange={handleChange}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleClick}
                    className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Login
                </button>
                <Link className={'text-gray-800 hover:text-blue-800 '}
                      to={RouterName.REGISTRATION}>Registration</Link>
            </div>
        </div>
    );
}
