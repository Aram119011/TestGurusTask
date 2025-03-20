import {Link, useNavigate} from "react-router-dom";
import {RouterName} from "../routers/router.js";
import {useEffect, useState} from "react";
import {useRegistration} from "../api/mutations.js";
import {toast} from "react-toastify";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const {mutate, isError, isSuccess, isPending} = useRegistration()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setErrors({...errors, [e.target.name]: ''})
    }

    const validate = () => {

        if (formData) {
            let isValidate = true
            const error = {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            }

            if (!formData.username.trim().length) {
                isValidate = false
                error.username = 'Please enter a valid username'
            }
            if (!formData.email.trim().length) {
                isValidate = false
                error.email = 'Please enter a  email'
            }
            if (formData.email.length && !validateEmail(formData.email)) {
                isValidate = false
                error.email = 'Please enter a valid email'
            }
            if (!formData.password.trim().length) {
                isValidate = false
                error.password = 'Please enter a valid password'
            }
            if (!formData.confirmPassword.trim().length) {
                isValidate = false
                error.confirmPassword = 'Please enter a valid confirm password'
            }
            if (formData.password.length && formData.confirmPassword.length && formData.password !== formData.confirmPassword) {
                isValidate = false
                error.password = 'Passwords do not match';
            }
            setErrors(error)
            return isValidate
        }
        return false
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleClick = async () => {
        if (validate()) {
            const newObj = {...formData}
            delete newObj.confirmPassword
            mutate(newObj)
        }

    }

    useEffect(() => {
        if (isSuccess) {
            navigate(RouterName.SIGN_IN)
        }
        if (isError) {
            toast.error('Something went wrong')
        }

    }, [isSuccess, isError]);
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                <div>
                    <label className="block text-gray-700">User name</label>
                    <input
                        onChange={handleChange}
                        value={formData?.username}
                        name={'username'}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.userName ? <p className={'text-red-700'}>{errors.userName}</p> : null}
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        onChange={handleChange}
                        value={formData?.email}
                        name={'email'}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email ? <p className={'text-red-700'}>{errors.email}</p> : null}

                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        onChange={handleChange}
                        value={formData?.password}
                        name={'password'}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password ? <p className={'text-red-700'}>{errors.password}</p> : null}

                </div>
                <div>
                    <label className="block text-gray-700">Confirm Password</label>
                    <input
                        onChange={handleChange}
                        value={formData?.confirmPassword}
                        name={'confirmPassword'}
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmPassword ? <p className={'text-red-700'}>{errors.confirmPassword}</p> : null}

                </div>
                <button onClick={handleClick}
                        className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {isPending ? 'loading...' : 'Register'}
                </button>
                <Link className={'text-gray-800 hover:text-blue-800 '} to={RouterName.SIGN_IN}>Already have an
                    account?</Link>
            </div>
        </div>
    );
}
