import {NavLink} from "react-router-dom";
import {RouterName} from "../routers/router.js";

export const Sidebar = () => {
    return <div className="w-64 min-h-screen bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
            <NavLink to={RouterName.BLOGS} className="block p-2 rounded-lg hover:bg-gray-700">Blogs</NavLink>
            <button  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600" onClick={() => {
                localStorage.removeItem('token')
                window.location.reload()
            }}>Log out
            </button>
        </nav>
    </div>
}

